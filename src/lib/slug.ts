export function slugify(s: string) {
  return s
    .normalize("NFD").replace(/\p{Diacritic}/gu, "") // saca tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // limpia símbolos raros
    .replace(/\s+/g, "-")         // espacios → guiones
    .replace(/-+/g, "-");         // colapsa guiones
}
