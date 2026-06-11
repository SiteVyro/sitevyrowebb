## Lösning

**1. Ny sida `src/pages/Vilkor.tsx`**
- Samma mörka tema, navbar och bakgrund som resten av sajten.
- Innehåller exakt den text användaren skickat (Allmänna Villkor - SiteVyro, daterad 2026-06-11, alla 16 punkter).
- Strukturerad med h1, h2 för rubriker, listor för punktlistor, läsbar typografi (max-width container).

**2. Routing `src/App.tsx`**
- Lägg till `<Route path="/vilkor" element={<Vilkor />} />`.

**3. Footer-länk**
- Lägg till "Vilkor" i `src/components/Footer.tsx` och `src/components/SocialFooter.tsx` som länkar till `/vilkor`.