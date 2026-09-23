function mapLines(value, convertLine) {
  return value.split(/\r?\n/).map(convertLine).join('\n');
}

function toSlugLine(value) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitleCaseLine(value) {
  return value
    .trim()
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function toSentenceCaseLine(value) {
  const text = value.trim().replace(/-/g, ' ').replace(/\s+/g, ' ').toLowerCase();
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function toSlug(value) {
  return mapLines(value, toSlugLine);
}

export function toTitleCase(value) {
  return mapLines(value, toTitleCaseLine);
}

export function toSentenceCase(value) {
  return mapLines(value, toSentenceCaseLine);
}
