export function getText(richText) {
  if (!Array.isArray(richText)) return "";
  return richText.map(t => t?.plain_text || "").join("");
}
