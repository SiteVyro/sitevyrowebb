

## Plan

### Problem
Zoom-parallax-animationen skärs av abrupt och det finns onödigt tomt utrymme runt sektionen.

### Ändringar

**1. `src/components/ui/zoom-parallax.tsx`**
- Lägg till fade-to-black gradient-overlays i topp och bott av sticky-containern (`pointer-events-none` divs med `bg-gradient-to-b from-black` och `bg-gradient-to-t from-black`) så att bilderna tonar ut mjukt istället för att klippas.

**2. `src/pages/Social.tsx`**
- Ta bort `py-16` från sektionen som wrappar ZoomParallax.
- Ta bort `mb-4` från rubriken och ge den minimal spacing.
- Minska eller ta bort mellanrum mellan föregående sektion och ZoomParallax, samt mellan ZoomParallax och footern.

