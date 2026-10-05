export async function storageUrl(
  key: string | null | undefined,
): Promise<string | null> {
  if (!key) return null;

  return `/uploads/${encodeURIComponent(key)}`;
}