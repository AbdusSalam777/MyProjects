import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Section, SectionHeading, Reveal } from "./ui";
import { faq } from "../data/services";

function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-line">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg font-medium tracking-tight text-bone sm:text-xl">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              isOpen ? "border-violet text-violet" : "border-line text-muted"
            }`}
          >
            <FiPlus />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted sm:text-base">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" className="border-t border-line/60">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Before you ask"
            title="The questions hirers always have."
            lead="If yours isn't here, just ask — I answer within a day."
          />
        </div>

        <div>
          {faq.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
