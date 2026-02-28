

## Plan: Restyle FAQ to Chat Conversation Layout

The reference image shows a chat-bubble style: questions appear as gray bubbles on the **left** (inline-width, not full-width), answers appear as blue bubbles on the **right**, mimicking a text message conversation.

### Changes to `src/components/ui/faq-chat-accordion.tsx`

1. **Question buttons**: Change from full-width to inline/fit-content, left-aligned, with light gray background (`bg-gray-200 text-gray-900`) and rounded-full pill shape. Remove border styling. Plus/minus icon sits inline next to the text.

2. **Answer bubbles**: Right-align with `ml-auto`, use a bright blue background (`bg-[#3B9FFF]`) with white text, rounded-2xl, no border. Remove the subdued `bg-primary/10` styling.

3. **Layout**: Each item is a vertical stack — question bubble left-aligned, answer bubble right-aligned below it — creating the chat conversation feel.

### Changes to `src/components/FAQSection.tsx`

4. **Title styling**: Make the title bold black (`text-foreground`) and subtitle lighter, matching the reference's clean look. No changes needed — already correct for dark theme.

