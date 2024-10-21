
const publicFilters =
{
  "general": ["Todos", "Condomínio", "Urbano", "Comerciais", "Rurais", "Planta"],
  "types": ["Tudo", "Casa", "Apartamento", "Loft", "Chácara"]
}
export type PublicFilters = { general: string, type: string } | null
export default publicFilters


