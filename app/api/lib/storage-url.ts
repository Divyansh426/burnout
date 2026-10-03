import { storage } from "./storage";

// Resolve a storage key to a short-lived presigned URL. Never persist the result.
export async function storageUrl(key: string | null | undefined): Promise<string | null> {
  if (!key) return null;
  try {
    const { url } = await storage.getPresignedUrl({ key });
    return url;
  } catch {
    return null;
  }
}
