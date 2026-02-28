"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp,
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn("p-4 space-y-6", className)}>
      {timestamp && (
        <p className="text-xs text-muted-foreground text-center">{timestamp}</p>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem ?? undefined}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id.toString()}
            className="mb-3"
          >
            <Accordion.Trigger asChild>
              <button
                className={cn(
                  "flex items-center justify-between w-full rounded-2xl px-5 py-4 text-left transition-colors",
                  "bg-white/5 border border-border/20 hover:bg-white/10 backdrop-blur-sm",
                  questionClassName
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && item.iconPosition === "left" && (
                    <span className="text-lg">{item.icon}</span>
                  )}
                  <span className="text-foreground font-medium text-sm md:text-base">
                    {item.question}
                  </span>
                  {item.icon && item.iconPosition !== "left" && (
                    <span className="text-lg">{item.icon}</span>
                  )}
                </div>

                <span className="shrink-0 ml-4 text-muted-foreground">
                  {openItem === item.id.toString() ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </span>
              </button>
            </Accordion.Trigger>
            <Accordion.Content forceMount asChild>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pt-2 pb-4">
                  <div
                    className={cn(
                      "rounded-2xl bg-primary/10 border border-primary/20 px-5 py-4",
                      answerClassName
                    )}
                  >
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
