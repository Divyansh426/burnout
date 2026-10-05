export async function storageUrl(
  key: string | null | undefined,
): Promise<string | null> {
  if (!key) return null;

  const baseUrl =
    process.env.PUBLIC_API_URL || "http://localhost:3000";

  return `${baseUrl}/uploads/${encodeURIComponent(key)}`;
}