
const publicFilters =
{
  "general": ["Condomínio", "Urbano", "Comerciais", "Rurais", "Planta"],
  "types": ["Casa", "Apartamento", "Loft", "Chácara"]
}
export type PublicFilters = { general: string, type: string } | null
export default publicFilters


