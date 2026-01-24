export function getAssetPrefix(folderPath) {
  const depth = folderPath.split("backups")[1]
    .split("/")
    .filter(Boolean).length;

  return "../".repeat(depth) + "assets/";
}
