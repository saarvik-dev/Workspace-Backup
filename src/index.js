import { sanitizeName } from "./utils/sanitizeName.js";
import fs from "fs";
import path from "path";
import { parsePage } from "./parser/parsePage.js";
import { ROOT_PAGES } from "./config/rootPages.js";
import { notion } from "./notion/client.js";
import { queryDatabase } from "./notion/queryDatabase.js";

const BASE_DIR = path.join(process.cwd(), "backups");
const CACHE_FILE = path.join(BASE_DIR, "sync-metadata.json");

async function runBackup() {
  // Ensure backups directory exists
  fs.mkdirSync(BASE_DIR, { recursive: true });

  // Load cache
  let cache = { pages: {}, databases: {} };
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
      if (!cache.pages) cache.pages = {};
      if (!cache.databases) cache.databases = {};
    } catch (err) {
      console.warn("⚠️ Warning: Failed to parse sync-metadata.json, starting fresh.");
    }
  }

  const pagesToSync = [];

  const dbId = process.env.NOTION_DATABASE_ID;
  if (dbId) {
    console.log("🔍 Querying pages from Notion Database registry...");
    try {
      let cursor = undefined;
      do {
        const res = await queryDatabase(dbId, cursor);

        for (const row of res.results) {
          const activeProp = row.properties.Active ?? Object.values(row.properties).find(p => p.type === 'checkbox');
          const isActive = activeProp ? activeProp.checkbox : true;

          if (!isActive) continue;

          const linkProp = row.properties["Page Link"] ?? Object.values(row.properties).find(p => p.type === 'url');
          const url = linkProp ? linkProp.url : null;

          if (!url) {
            console.warn(`⚠️ Row "${row.id}" has no Page Link. Skipping.`);
            continue;
          }

          const match = url.match(/([a-f0-9]{32})/i);
          if (!match) {
            console.warn(`⚠️ Could not parse a valid page ID from URL: ${url}. Skipping.`);
            continue;
          }
          const pageId = match[1];

          const titleProp = row.properties["Page Name"] ?? Object.values(row.properties).find(p => p.type === 'title');
          const name = titleProp?.title?.[0]?.plain_text || `Page-${pageId}`;

          pagesToSync.push({ id: pageId, name: sanitizeName(name) });
        }
        cursor = res.has_more ? res.next_cursor : undefined;
      } while (cursor);

      console.log(`📋 Found ${pagesToSync.length} active pages in database registry.`);
    } catch (err) {
      console.error("❌ Failed to query Notion database registry:", err.message);
      throw err; // throw instead of falling back
    }
  } else {
    // Only fall back to local config if NOTION_DATABASE_ID is not provided at all
    if (ROOT_PAGES && ROOT_PAGES.length > 0) {
      console.log("ℹ️ Using pages from config file (config/rootPages.js)...");
      pagesToSync.push(...ROOT_PAGES.map(p => ({ id: p.id, name: sanitizeName(p.name) })));
    } else {
      console.error("❌ Error: No NOTION_DATABASE_ID provided and rootPages.js is empty!");
      return;
    }
  }

  // Run the backup for each page
  for (const page of pagesToSync) {
    const folder = path.join(BASE_DIR, page.name);
    fs.mkdirSync(folder, { recursive: true });

    try {
      await parsePage(page.id, folder, cache);
    } catch (err) {
      console.error(`❌ Error backing up ${page.name}:`, err.message);
    }
  }

  // Save updated cache
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
    console.log("💾 Sync cache updated.");
  } catch (err) {
    console.error("❌ Failed to save sync cache:", err.message);
  }

  console.log("✅ Backup process completed");
}

runBackup();
