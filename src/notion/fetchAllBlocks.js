import { notion } from "./client.js";

export async function fetchAllBlocks(blockId) {
  let blocks = [];
  let cursor = undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100
    });

    blocks.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;

  } while (cursor);

  return blocks;
}
