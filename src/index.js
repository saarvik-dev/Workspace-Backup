import fs from "fs";
import path from "path";
import { parsePage } from "./parser/parsePage.js";
import { ROOT_PAGES } from "./config/rootPages.js";

const BASE_DIR = path.join(process.cwd(), "backups");

async function runBackup() {
  for (const page of ROOT_PAGES) {

    const folder = path.join(BASE_DIR, page.name);
    fs.mkdirSync(folder, { recursive: true });

    console.log("Backing up:", page.name);

    await parsePage(page.id, folder);
  }

  console.log("✅ Backup completed");
}

runBackup();
