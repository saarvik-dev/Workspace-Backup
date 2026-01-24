import fs from "fs";
import dotenv from "dotenv";
import { parsePage } from "./parser/parsePage.js";

dotenv.config();

if (!fs.existsSync("backups/pages")) {
  fs.mkdirSync("backups/pages", { recursive: true });
}

await parsePage(process.env.ROOT_PAGE_ID, "backups/pages");

console.log("✅ NOTION BACKUP FINISHED");
