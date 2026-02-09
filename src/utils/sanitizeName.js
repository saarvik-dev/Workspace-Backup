export function sanitizeName(name) {
  return name
    .replace(/[\\/:*?"<>|]/g, "")   // remove illegal Windows chars
    .replace(/\s+/g, " ")            // collapse extra spaces
    .trim();
}
