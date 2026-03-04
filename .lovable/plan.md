

## Problem
1. Fade-gradient-overlays döljer bilderna (gör dem osynliga vid topp/bott)
2. `h-[300vh]` skapar massvis med tomt utrymme efter att animationen är klar

## Ändringar

**1. `src/components/ui/zoom-parallax.tsx`**
- Ta bort fade-overlay-divarna (rad 61-63) helt -- bilderna ska synas fullt ut
- Minska scroll-container från `h-[300vh]` till `h-[200vh]` för att reducera tomrummet efter sektionen

**2. `src/pages/Social.tsx`**
- Ingen ändring behövs

