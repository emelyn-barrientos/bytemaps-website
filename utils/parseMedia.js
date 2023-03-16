export function parseMedia(media) {
  const url = `https:${media.fields.file.url}`
  const width = media.fields.file.details.image.width
  const height = media.fields.file.details.image.height
  const alt = media.fields.description
  return {
    url,
    width,
    height,
    alt,
  }
}
