

## Plan: Tre ändringar

### 1. Ny SocialMediaSection på startsidan
Skapa `src/components/SocialMediaSection.tsx` — en kort teaser-sektion som placeras efter `ServicesSection` i `Index.tsx`. Innehåller titel, kort beskrivning och en "Läs mer"-knapp som länkar till `/social`.

### 2. Uppdatera "Vad som ingår" på /social
Ändra `socialMedia.services` i `LanguageContext.tsx` till:
- Fotografering
- Filmning
- Drönarfoton
- Profiloptimering

### 3. GlowCard-komponent för plattformskorten
Skapa `src/components/ui/spotlight-card.tsx` med den angivna GlowCard-komponenten. Använd `glowColor="purple"` för att matcha temat. Byt ut de vanliga plattformskorten i `Social.tsx` mot `<GlowCard>`.

### Filer som ändras
| Fil | Ändring |
|-----|---------|
| `src/components/ui/spotlight-card.tsx` | Ny — GlowCard-komponent |
| `src/contexts/LanguageContext.tsx` | Uppdatera services-listan + lägg till teaser-texter |
| `src/components/SocialMediaSection.tsx` | Ny — teaser-sektion för startsidan |
| `src/pages/Index.tsx` | Importera och placera SocialMediaSection |
| `src/pages/Social.tsx` | Byt plattformskort till GlowCard |

