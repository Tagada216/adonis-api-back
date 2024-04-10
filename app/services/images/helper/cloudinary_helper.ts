export function extractPublicIdFromUrl(url: string): string {
  const parts = url.split('/')

  const index = parts.indexOf('upload') + 1
  const publicIdParts = parts.slice(index + 1)
  const publicId = publicIdParts.join('/').split('.')[0]
  return publicId
}
