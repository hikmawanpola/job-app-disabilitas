export const cls = (...s: Array<string | boolean | undefined>) =>
  s.filter(Boolean).join(" ");
