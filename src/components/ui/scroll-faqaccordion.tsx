"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface ScrollFAQAccordionProps {
  data: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function ScrollFAQAccordion({
  data,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions.",
  className,
  questionClassName,
  answerClassName,
}: ScrollFAQAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || data.length === 0) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${data.length * 200}`,
        scrub: 0.3,
        pin: true,
        markers: false,
      },
    });

    data.forEach((item, index) => {
      const contentRef = contentRefs.current.get(item.id.toString());
      if (contentRef) {
        tl.add(() => {
          setOpenItem(item.id.toString());
        }, index * 2);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center px-4 py-20",
        className
      )}
    >
      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-2">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground text-center">
            {title}
          </h2>
        </div>

        <div className="mb-10">
          <p className="text-muted-foreground text-lg text-center">
            {subtitle}
          </p>
        </div>

        <Accordion.Root
          type="single"
          value={openItem ?? undefined}
          onValueChange={(value) => setOpenItem(value)}
          collapsible
          className="space-y-3"
        >
          {data.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id.toString()}
              className="border border-border/30 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <Accordion.Trigger
                className={cn(
                  "flex items-center justify-between w-full px-5 py-4 text-left transition-colors hover:bg-white/5",
                  questionClassName
                )}
              >
                <span className="text-foreground font-medium text-base md:text-lg pr-4">
                  {item.question}
                </span>

                <span className="shrink-0 text-primary">
                  {openItem === item.id.toString() ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </Accordion.Trigger>

              <Accordion.Content forceMount asChild>
                <motion.div
                  ref={(el) => {
                    if (el) contentRefs.current.set(item.id.toString(), el);
                  }}
                  initial="collapsed"
                  animate={openItem === item.id.toString() ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <p className={cn("text-muted-foreground text-sm md:text-base leading-relaxed", answerClassName)}>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}
