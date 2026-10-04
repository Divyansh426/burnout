import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function saveLocalImage(
  fileName: string,
  bytes: Uint8Array,
  contentType: string,
) {
  const ext = path.extname(fileName).toLowerCase();

  if (!Object.keys(MIME_TYPES).includes(ext)) {
    throw new Error("Unsupported image format");
  }

  if (MIME_TYPES[ext] !== contentType) {
    throw new Error("Image type does not match its extension");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const key = `${randomUUID()}${ext}`;
  await writeFile(path.join(UPLOAD_DIR, key), bytes);

  return { key };
}

export async function readLocalImage(key: string) {
  if (!/^[a-f0-9-]+\.(jpg|jpeg|png|webp|gif)$/i.test(key)) {
    return null;
  }

  try {
    const bytes = await readFile(path.join(UPLOAD_DIR, key));
    const ext = path.extname(key).toLowerCase();

    return {
      bytes,
      contentType: MIME_TYPES[ext],
    };
  } catch {
    return null;
  }
}

export async function deleteLocalImage(key: string) {
  if (!/^[a-f0-9-]+\.(jpg|jpeg|png|webp|gif)$/i.test(key)) {
    return;
  }

  try {
    await unlink(path.join(UPLOAD_DIR, key));
  } catch {
    // File may already have been deleted.
  }
}