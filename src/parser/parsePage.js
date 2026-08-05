import { sanitizeName } from "../utils/sanitizeName.js";
import fs from "fs";
import path from "path";
import { fetchAllBlocks } from "../notion/fetchAllBlocks.js";
import { richTextToMarkdown } from "../utils/richTextToMarkdown.js";
import { downloadAsset } from "../exporters/assets.js";
import { downloadFile } from "../files/fileHandler.js";
import { parseTable } from "../tables/tableParser.js";
import { exportDatabase } from "../database/databaseExporter.js";
import { notion } from "../notion/client.js";

/* ---------- helper: calculate ../../assets path ---------- */
function getAssetPrefix(folderPath) {
  const relative = folderPath.split("backups")[1] || "";
  const depth = relative.split(path.sep).filter(Boolean).length;
  return "../".repeat(depth) + "assets/";
}

function getPageTitle(page) {
  if (!page || !page.properties) return "Untitled";
  const titleProp = Object.values(page.properties).find(p => p.type === 'title');
  if (titleProp && titleProp.title && titleProp.title.length > 0) {
    return titleProp.title.map(t => t.plain_text || "").join("");
  }
  return "Untitled";
}

async function parseBlock(block, folderPath, links, assetPrefix, cache, discoveredChildren) {
  let md = "";

  switch (block.type) {

    case "paragraph": {
      const text = richTextToMarkdown(block.paragraph?.rich_text, links);
      if (text) md += text + "\n\n";
      break;
    }

    case "heading_1":
      md += "# " + richTextToMarkdown(block.heading_1?.rich_text, links) + "\n\n\n";
      break;

    case "heading_2":
      md += "## " + richTextToMarkdown(block.heading_2?.rich_text, links) + "\n\n";
      break;

    case "heading_3":
      md += "### " + richTextToMarkdown(block.heading_3?.rich_text, links) + "\n\n";
      break;

    case "bulleted_list_item":
      md += "- " + richTextToMarkdown(block.bulleted_list_item?.rich_text, links) + "\n";
      break;

    case "numbered_list_item":
      md += "1. " + richTextToMarkdown(block.numbered_list_item?.rich_text, links) + "\n";
      break;

    case "to_do":
      md += `- [${block.to_do?.checked ? "x" : " "}] `
           + richTextToMarkdown(block.to_do?.rich_text, links) + "\n";
      break;

    case "divider":
      md += "\n---\n\n";
      break;

    case "code": {
      const lang = block.code?.language || "";
      const code = block.code?.rich_text?.map(t => t.plain_text).join("") || "";
      md += "\n```" + lang + "\n" + code + "\n```\n\n";
      break;
    }

    case "image": {
      const url = block.image?.file?.url || block.image?.external?.url;
      if (url) {
        const filename = block.id + ".png";
        await downloadAsset(url, filename);
        md += `\n![](${assetPrefix}${filename})\n\n`;
      }
      break;
    }

    case "file":
    case "pdf":
    case "video":
    case "audio": {
      const data = block[block.type];
      const url = data?.file?.url || data?.external?.url;
      if (url) {
        const filename = block.id;
        await downloadFile(url, filename);
        md += `\n📎 Attachment: ${assetPrefix}${filename}\n\n`;
      }
      break;
    }

    case "table":
      md += "\n" + await parseTable(block) + "\n";
      break;

    case "child_database": {
      const dbName = block.child_database?.title || "Database";
      const safeName = sanitizeName(dbName);
      const dbRelative = `databases/${safeName}`;

      discoveredChildren.push({
        type: "database",
        id: block.id,
        relativePath: dbRelative
      });

      await exportDatabase(block.id, safeName, cache);
      break;
    }

    case "child_page": {
      const rawName = block.child_page?.title || "Untitled";
      const safeName = sanitizeName(rawName);
      const childFolder = path.join(folderPath, safeName);
      fs.mkdirSync(childFolder, { recursive: true });

      const childRelative = path.relative(path.join(process.cwd(), "backups"), childFolder);
      discoveredChildren.push({
        type: "page",
        id: block.id,
        relativePath: childRelative
      });

      await parsePage(block.id, childFolder, cache);
      break;
    }

  }

  if (
    block.has_children &&
    block.type !== "child_page" &&
    block.type !== "table"
  ) {
    const children = await fetchAllBlocks(block.id);
    for (const child of children) {
      md += await parseBlock(child, folderPath, links, assetPrefix, cache, discoveredChildren);
    }
  }

  return md;
}

export async function parsePage(pageId, folderPath, cache) {
  const BASE_DIR = path.join(process.cwd(), "backups");
  const relativePath = path.relative(BASE_DIR, folderPath);

  let page;
  try {
    page = await notion.pages.retrieve({ page_id: pageId });
  } catch (err) {
    console.error(`⚠️ Failed to retrieve page ${pageId}: ${err.message}`);
    return;
  }

  const lastEditedTime = page.last_edited_time;
  const title = getPageTitle(page);

  const cached = cache.pages[pageId];
  const folderMatches = cached && cached.relativePath === relativePath;
  const readmeExists = fs.existsSync(path.join(folderPath, "README.md"));

  if (cached && folderMatches && readmeExists && cached.last_edited_time === lastEditedTime) {
    console.log(`\t⏭️ Skipping page (no changes): ${title}`);
    if (cached.children && Array.isArray(cached.children)) {
      for (const child of cached.children) {
        const childAbsPath = path.join(BASE_DIR, child.relativePath);
        if (child.type === 'page') {
          await parsePage(child.id, childAbsPath, cache);
        } else if (child.type === 'database') {
          const dbName = path.basename(child.relativePath);
          await exportDatabase(child.id, dbName, cache);
        }
      }
    }
    return;
  }

  console.log(`⏳ Backing up page: ${title}`);
  const blocks = await fetchAllBlocks(pageId);
  const links = [];
  const assetPrefix = getAssetPrefix(folderPath);
  let md = "";
  const discoveredChildren = [];

  for (const block of blocks) {
    md += await parseBlock(block, folderPath, links, assetPrefix, cache, discoveredChildren);
  }

  if (links.length) {
    md += "\n---\n\n🔗 **References**\n";
    for (const l of links) {
      md += `- ${l.text} → ${l.url}\n`;
    }
    md += "\n";
  }

  // Ensure output folder exists and write file
  fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(path.join(folderPath, "README.md"), md);

  // Update cache
  cache.pages[pageId] = {
    last_edited_time: lastEditedTime,
    relativePath: relativePath,
    children: discoveredChildren
  };
}
