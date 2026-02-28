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
            className="mb-4"
          >
            {/* Question bubble - left aligned, inline width */}
            <Accordion.Trigger asChild>
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl rounded-bl-sm px-4 py-3 text-left transition-colors",
                  "bg-muted text-foreground hover:bg-muted/80",
                  questionClassName
                )}
              >
                {item.icon && item.iconPosition === "left" && (
                  <span className="text-lg">{item.icon}</span>
                )}
                <span className="font-medium text-sm md:text-base">
                  {item.question}
                </span>
                {item.icon && item.iconPosition !== "left" && (
                  <span className="text-lg">{item.icon}</span>
                )}
                <span className="shrink-0 ml-1 text-muted-foreground">
                  {openItem === item.id.toString() ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </span>
              </button>
            </Accordion.Trigger>

            {/* Answer bubble - right aligned */}
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
                <div className="flex justify-end pt-2">
                  <div
                    className={cn(
                      "inline-block rounded-2xl rounded-br-sm bg-primary px-4 py-3 max-w-[85%]",
                      answerClassName
                    )}
                  >
                    <p className="text-primary-foreground text-sm md:text-base leading-relaxed">
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
