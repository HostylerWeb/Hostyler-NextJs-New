import { copyFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "src/lib/brand/favicon-source.png");
const appDir = join(root, "src/app");

await copyFile(source, join(appDir, "icon.png"));

const apple180 = await sharp(source)
  .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

await writeFile(join(appDir, "apple-icon.png"), apple180);

console.log("Generated src/app/icon.png from favicon-source.png");
console.log("Generated src/app/apple-icon.png (180x180)");
