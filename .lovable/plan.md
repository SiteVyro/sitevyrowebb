

## Problem
Bilderna skalar ut och når kanten av viewport, vilket skapar en synlig skarp kant. 

## Lösning

**`src/components/ui/zoom-parallax.tsx`**
- Minska scale-värdena så att bilderna inte skalar ut till viewportens kant. Ändra från `[1,4], [1,5], [1,6], [1,8], [1,9]` till lägre värden som `[1,2.5], [1,3], [1,3.5], [1,3], [1,3.5], [1,4.5], [1,5]` — bilderna skalar fortfarande men når aldrig kanterna.

