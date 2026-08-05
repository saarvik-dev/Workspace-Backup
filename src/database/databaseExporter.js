import fs from "fs";
import path from "path";
import { notion } from "../notion/client.js";
import { parsePage } from "../parser/parsePage.js";
import { queryDatabase } from "../notion/queryDatabase.js";

export async function exportDatabase(databaseId, name, cache) {
  const BASE_DIR = path.join(process.cwd(), "backups");
  const base = `backups/databases/${name}`;
  const relativePath = `databases/${name}`;

  let db;
  try {
    db = await notion.databases.retrieve({ database_id: databaseId });
  } catch (err) {
    console.error(`⚠️ Failed to retrieve database ${databaseId}: ${err.message}`);
    return;
  }

  const lastEditedTime = db.last_edited_time;

  const cached = cache.databases[databaseId];
  const schemaExists = fs.existsSync(path.join(base, "schema.json"));

  if (cached && schemaExists && cached.last_edited_time === lastEditedTime) {
    console.log(`\t⏭️ Skipping database (no changes): ${name}`);
    if (cached.children && Array.isArray(cached.children)) {
      for (const child of cached.children) {
        await parsePage(child.id, path.join(BASE_DIR, child.relativePath), cache);
      }
    }
    return;
  }

  console.log(`⏳ Exporting database: ${name}`);
  fs.mkdirSync(path.join(base, "entries"), { recursive: true });

  fs.writeFileSync(
    path.join(base, "schema.json"),
    JSON.stringify(db.properties, null, 2)
  );

  const discoveredRows = [];
  let cursor = undefined;

  do {
    const res = await queryDatabase(databaseId, cursor);

    for (const row of res.results) {
      const titleProp = Object.values(row.properties).find(p => p.type === 'title');
      const title = titleProp?.title?.[0]?.plain_text || row.id;

      const folder = path.join(base, "entries", title);
      fs.mkdirSync(folder, { recursive: true });

      const rowRelative = path.relative(BASE_DIR, folder);
      discoveredRows.push({
        type: "page",
        id: row.id,
        relativePath: rowRelative
      });

      await parsePage(row.id, folder, cache);
    }

    cursor = res.has_more ? res.next_cursor : undefined;

  } while (cursor);

  // Update cache
  cache.databases[databaseId] = {
    last_edited_time: lastEditedTime,
    relativePath: relativePath,
    children: discoveredRows
  };
}
