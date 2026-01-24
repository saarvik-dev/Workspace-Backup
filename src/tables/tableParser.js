import { fetchAllBlocks } from "../notion/fetchAllBlocks.js";
import { getText } from "../utils/text.js";

export async function parseTable(block) {
  const rows = await fetchAllBlocks(block.id);

  let md = "";
  let header = [];
  let body = [];

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].table_row.cells.map(cell =>
      getText(cell)
    );

    if (i === 0) header = cells;
    else body.push(cells);
  }

  md += "| " + header.join(" | ") + " |\n";
  md += "| " + header.map(() => "---").join(" | ") + " |\n";

  for (const row of body) {
    md += "| " + row.join(" | ") + " |\n";
  }

  md += "\n\n";
  return md;
}
