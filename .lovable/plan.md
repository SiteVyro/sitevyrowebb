

## Plan: Ny sida `/social` för Sociala Medier-tjänster

Istället för en sektion på startsidan skapar vi en **helt ny sida** på `/social`.

### Ändringar

**1. Översättningar — `src/contexts/LanguageContext.tsx`**
- Lägg till `socialMedia`-nyckel med SV/EN-texter: titel, beskrivning (texten du gav), tjänstepunkter (innehållsplanering, grafisk design, publicering, profiloptimering), CTA-text, och plattformsnamn.

**2. Ny sida — `src/pages/Social.tsx`**
- Hero-sektion med titel och beskrivningen du angav
- Fyra plattformskort (TikTok, Instagram, Facebook, LinkedIn) med ikoner
- Lista med vad som ingår (check-ikoner)
- CTA-knapp "Kontakta oss" som länkar till `/#contact`
- Navbar och Footer inkluderade
- Samma dark theme och styling som övriga sidan (motion-animationer, glassmorphism)
- Inga priser visas

**3. Routing — `src/App.tsx`**
- Lägg till `<Route path="/social" element={<Social />} />`

**4. Navigation — `src/components/Navbar.tsx`**
- Lägg till "Sociala Medier" / "Social Media" länk som pekar på `/social`

