

## Prestandaoptimering — Ta bort lagg

### Problem
Sidan laggar pga tre huvudorsaker:
1. Framer Motion parallax uppdaterar DOM vid varje scroll-frame (transform-style)
2. 36 animerade SVG-paths med `will-change` skapar för många GPU-lager
3. Stora CSS blur-effekter (120px) i hero-sektionen

### Åtgärder

#### 1. Ersätt Framer Motion parallax med ren CSS
Byt ut `motion.div` + `useTransform` mot CSS `transform: translateZ()` och `perspective` för parallax-effekt. Ingen JavaScript körs vid scroll.

**Fil:** `src/components/ui/background-paths.tsx`
- Ta bort `useScroll`, `useTransform`, `motion` imports
- Använd CSS-only parallax med `transform: translateZ(-Xpx) scale(Y)` inuti en `perspective`-container
- Behåll samma visuella effekt utan JS-scroll-listeners

#### 2. Minska antal paths och ta bort will-change
- Minska från 18 till 10 paths per instans (20 totalt istället för 36)
- Ta bort `will-change` från CSS — det reserverar onödiga GPU-lager

**Fil:** `src/index.css`
- Ta bort `will-change: stroke-dashoffset, opacity;` från `.animate-path-flow`

**Fil:** `src/components/ui/background-paths.tsx`
- Ändra `length: 18` till `length: 10`

#### 3. Minska blur i HeroSection
- Minska `blur-[120px]` till `blur-[80px]` — fortfarande mjukt men mycket billigare att rendera

**Fil:** `src/components/HeroSection.tsx`
- Ändra `blur-[120px]` till `blur-[80px]` på glow-orbs

### Resultat
- Ingen JavaScript körs vid scroll (ren CSS parallax)
- 44% färre SVG-paths
- Lägre GPU-belastning (ingen will-change, mindre blur)
- Visuellt nästan identiskt

