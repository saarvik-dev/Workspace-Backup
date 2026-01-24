import fs from "fs";
import fetch from "node-fetch";
import path from "path";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function downloadAsset(url, filename, retries = 3) {
  if (!fs.existsSync("backups/assets")) {
    fs.mkdirSync("backups/assets", { recursive: true });
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(url, {
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error("Fetch failed");

      const buffer = await res.arrayBuffer();

      fs.writeFileSync(
        path.join("backups/assets", filename),
        Buffer.from(buffer)
      );

      return `../assets/${filename}`;

    } catch (err) {
      console.log(`⚠️ Image download failed (attempt ${attempt})`);

      if (attempt === retries) {
        console.log("⏭️ Skipping image");
        return null;
      }

      await sleep(2000);
    }
  }
}
