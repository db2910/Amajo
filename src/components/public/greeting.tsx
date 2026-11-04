"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

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
    <div className="flex items-center gap-4 text-white">
      <p className="sr-only">
        Hello, Muraho, Habari, Bonjour. Welcome to AMAJO.
      </p>
      <div aria-hidden="true" className="w-36 font-display text-3xl">
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
          className="min-h-11 rounded-md px-2 text-xs text-white/90 underline underline-offset-4 focus-visible:outline-white"
        >
          {paused ? "Resume greeting" : "Pause greeting"}
        </button>
      )}
    </div>
  );
}
