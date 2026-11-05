"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

const greetings = ["Hello", "Muraho", "Habari", "Bonjour"];

export function Greeting() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % greetings.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused]);

  return (
    <div className="relative mx-auto w-fit px-14 text-center text-white">
      <p className="sr-only">
        Hello, Muraho, Habari, Bonjour. Welcome to AMAJO.
      </p>
      <div
        aria-hidden="true"
        className="w-[7ch] font-display text-[2.75rem] leading-[1.15] md:text-6xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            data-testid="greeting"
            key={reducedMotion ? "Hello" : index}
            className="inline-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
          >
            {reducedMotion ? "Hello" : greetings[index]}
            <span className="text-gold">.</span>
          </motion.span>
        </AnimatePresence>
      </div>
      {!reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          className="absolute top-1/2 right-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/15 text-white transition-colors hover:bg-white/20 focus-visible:outline-white"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
          <span className="sr-only">
            {paused ? "Resume greeting" : "Pause greeting"}
          </span>
        </button>
      )}
    </div>
  );
}
