

## Plan: Add FAQ Section with Scroll Accordion

### 1. Install dependencies
- `gsap` and `@gsap/react`

### 2. Add FAQ translations to `src/contexts/LanguageContext.tsx`
Add a `faq` section with `title`, `subtitle`, and all 12 Q&A pairs in both Swedish and English.

### 3. Create `src/components/ui/scroll-faqaccordion.tsx`
Adapt the provided component:
- Remove `next/link` references, use standard React
- Keep GSAP scroll-pinning + scrub animation
- Keep framer-motion for open/close accordion items
- Style with dark theme (white text on transparent/black) to match the site
- Accept `data` prop with FAQ items

### 4. Create `src/components/FAQSection.tsx`
- Use `useLanguage()` to get current language
- Map the 12 FAQ items from translations, selecting `sv`/`en` based on `lang`
- Render `ScrollFAQAccordion` with the translated data
- Wrap in a section with `id="faq"`

### 5. Update `src/pages/Index.tsx`
- Import and add `<FAQSection />` between `ContactSection` and `Footer`

### FAQ Content (12 items, sv + en)
All 12 questions/answers provided by the user, translated to English for the `en` language option.

