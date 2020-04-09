export default function countWords(str) {
  if (str.length === 0) return 0;
  return str.trim().split(/\s+/).length;
}
