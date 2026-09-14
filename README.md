# Sitevyro: Vision Realized

Create a modern, high-end, animated website for a web agency called "Sitevyro".
The company creates professional websites for businesses. Design requirements:

The website must look extremely modern, sleek, and premium
Use lots of smooth animations, transitions, hover effects, and micro-interactions (prefer more animations than fewer)
Include scroll animations, parallax effects, animated sections, and dynamic UI elements
The design should instantly impress visitors and clearly showcase strong web design skills
Clean typography, bold layouts, glassmorphism/neumorphism elements, and modern gradients are encouraged
Dark + modern color palette with glowing accents Structure of the website:
Hero Section -Vyro stands for Vision your reach online
Large animated headline (e.g. “Webbsites for everyone”)
Animated background (particles, gradients, or motion effects)
Call-to-action buttons with hover animations
Subtle entrance animations on load
Services Section
Interactive cards with hover animations
Icons and animated transitions
Services should include web design, UI/UX, SEO, maintenence, server hosting, logo creation,
About Section
Modern layout with animated text reveal
Showcase creativity, innovation, and professionalism
Contact Section
Modern animated contact form
Smooth input focus effects
Clear call-to-action
Our phonenumber is 0765804568
Email is info@sitevyro.com
Technical & UX requirements:

Fully responsive and mobile-first design (must look amazing on phone, tablet, and desktop)
Fast loading and smooth performance
Use modern UI/UX trends (2025 style)
Smooth page transitions and section reveals
Sticky animated navbar
Subtle but constant motion across the site to make it feel alive Overall goal: The website should feel cutting-edge, highly animated, visually impressive, and clearly demonstrate that Sitevyro is an expert at building modern, high-quality websites for businesses.
Lägg till en footer section som det ska stå vår e-post och vårt telefonnummer. Det ska även stå vår adress och företagsnamn, addressen är värnamo, severige
Webbsite should have a button to switch between swedish and English 
The headder should be (webbsites for everybody) or in swedish (webbsidor för alla)
Also implement these building block from 21st.dev:
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
shape-landing-hero.tsx
"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        
            
                


            
        
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        


            



            


                

                

                

                

                
            



            


                


                    
                        
                        
                            {badge}
                        
                    

                    
                        


                            
                                {title1}
                            
                            

                            
                                {title2}
                            
                        


                    

                    
                        


                            Crafting exceptional digital experiences through
                            innovative design and cutting-edge technology.
                        


                    
                


            



            


        


    );
}

export { HeroGeometric }


demo.tsx
import { HeroGeometric } from "@/components/ui/shape-landing-hero"


function DemoHeroGeometric() {
    return <HeroGeometric badge="Kokonut UI"
            title1 = "Elevate Your"
            title2 = "Digital Vision" />
}

export { DemoHeroGeometric }
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sitevyrowebb.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7e07e9d1-70ef-4e41-b65c-40b230aa35cf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
