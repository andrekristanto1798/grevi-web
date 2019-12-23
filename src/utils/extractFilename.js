export default function extractFilename(filename) {
  return filename
    .split('.')
    .slice(0, -1)
    .join('.');
}
