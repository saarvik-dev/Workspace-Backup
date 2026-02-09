import { sanitizeName } from "../utils/sanitizeName.js";
import fs from "fs";
import path from "path";
import { fetchAllBlocks } from "../notion/fetchAllBlocks.js";
import { richTextToMarkdown } from "../utils/richTextToMarkdown.js";
import { downloadAsset } from "../exporters/assets.js";
import { downloadFile } from "../files/fileHandler.js";
import { parseTable } from "../tables/tableParser.js";
import { exportDatabase } from "../database/databaseExporter.js";

/* ---------- helper: calculate ../../assets path ---------- */
function getAssetPrefix(folderPath) {
  const relative = folderPath.split("backups")[1] || "";
  const depth = relative.split(path.sep).filter(Boolean).length;
  return "../".repeat(depth) + "assets/";
}

async function parseBlock(block, folderPath, links, assetPrefix) {
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

    case "child_database":
      await exportDatabase(block.id, block.child_database?.title || "Database");
      break;

    case "child_page": {
  const rawName = block.child_page?.title || "Untitled";
  const safeName = sanitizeName(rawName);

  const childFolder = path.join(folderPath, safeName);
  fs.mkdirSync(childFolder, { recursive: true });

  await parsePage(block.id, childFolder);
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
      md += await parseBlock(child, folderPath, links, assetPrefix);
    }
  }

  return md;
}

export async function parsePage(pageId, folderPath) {
  const blocks = await fetchAllBlocks(pageId);
  const links = [];
  const assetPrefix = getAssetPrefix(folderPath);
  let md = "";

  for (const block of blocks) {
    md += await parseBlock(block, folderPath, links, assetPrefix);
  }

  if (links.length) {
    md += "\n---\n\n🔗 **References**\n";
    for (const l of links) {
      md += `- ${l.text} → ${l.url}\n`;
    }
    md += "\n";
  }

  fs.writeFileSync(path.join(folderPath, "README.md"), md);
}
