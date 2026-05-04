export function capitalizeFirst(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function capitalizeFrMonthYear(formatted: string) {
  if (!formatted) return formatted;
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function splitAddress(adresse: string) {
  const trimmed = adresse.trim();
  if (!trimmed) return { line1: "—", line2: "" };
  const idx = trimmed.indexOf(",");
  if (idx === -1) return { line1: trimmed, line2: "" };
  return {
    line1: trimmed.slice(0, idx).trim(),
    line2: trimmed.slice(idx + 1).trim(),
  };
}

export function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
