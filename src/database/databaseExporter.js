import fs from "fs";
import path from "path";
import { notion } from "../notion/client.js";
import { parsePage } from "../parser/parsePage.js";

export async function exportDatabase(databaseId, name) {

  const base = `backups/databases/${name}`;

  fs.mkdirSync(path.join(base, "entries"), { recursive: true });

  const db = await notion.databases.retrieve({ database_id: databaseId });

  fs.writeFileSync(
    path.join(base, "schema.json"),
    JSON.stringify(db.properties, null, 2)
  );

  let cursor = undefined;

  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor
    });

    for (const row of res.results) {
      const title =
        Object.values(row.properties)
          .find(p => p.type === "title")
          ?.title?.[0]?.plain_text || row.id;

      const folder = path.join(base, "entries", title);

      fs.mkdirSync(folder, { recursive: true });

      await parsePage(row.id, folder);
    }

    cursor = res.has_more ? res.next_cursor : undefined;

  } while (cursor);
}
