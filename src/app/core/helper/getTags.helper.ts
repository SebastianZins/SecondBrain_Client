export function getTagsFromText(text: string): string[] {
  return text
    .split(/(\s+)/)
    .filter((word) => word.startsWith('#'))
    .map((word) => word.replace('#', ''));
}
