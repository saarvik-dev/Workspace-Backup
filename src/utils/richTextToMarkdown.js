export function richTextToMarkdown(richText = [], linkCollector = []) {
  if (!Array.isArray(richText)) return "";

  return richText.map(t => {
    let text = t.plain_text || "";

    // store links separately (clean reading)
    if (t.href) {
      linkCollector.push({
        text,
        url: t.href
      });
      return text;
    }

    if (t.annotations) {
      const a = t.annotations;
      if (a.code) return "`" + text + "`";
      if (a.bold) text = "**" + text + "**";
      if (a.italic) text = "*" + text + "*";
      if (a.strikethrough) text = "~~" + text + "~~";
    }

    return text;
  }).join("");
}
