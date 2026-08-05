import fetch from "node-fetch";

export async function queryDatabase(databaseId, cursor) {
  const token = process.env.NOTION_TOKEN;
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cursor ? { start_cursor: cursor } : {})
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Notion API query error: ${res.status} - ${errText}`);
  }

  return await res.json();
}
