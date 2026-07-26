import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import Hero from "../components/Hero";
import { MagneticButton } from "../components/ui";
import usePageMeta from "../lib/usePageMeta";

export default function HomePage() {
  usePageMeta(
    "Abdus Salam — Full-Stack Developer & MERN Freelancer",
    "I build MERN applications end to end. Fast, reliable web products designed and shipped."
  );

  return (
    <>
      <Hero />

      {/* Quick nav to other sections */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8 }}
        className="relative border-t border-line bg-ink px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-[130px]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
              What's next?
            </h2>
            <p className="mt-5 text-base text-muted sm:text-lg">
              Browse my work, see who I've built for, or let's start a conversation
              about your project.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton to="/work" variant="outline">
                View clients <FiArrowUpRight />
              </MagneticButton>
              <MagneticButton to="/projects">
                See projects <FiArrowUpRight />
              </MagneticButton>
              <MagneticButton to="/contact" variant="flame">
                Get in touch <FiArrowUpRight />
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
