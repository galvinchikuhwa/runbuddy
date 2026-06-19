"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

type RunLogFabProps = {
  onClick: () => void;
};

export function RunLogFab({ onClick }: RunLogFabProps) {
  return (
    <motion.button
      aria-label="Log a new run"
      className="fixed bottom-[1.5rem] right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-contrast)] shadow-[0_20px_60px_rgba(58,57,62,0.35)]"
      onClick={onClick}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.span
        animate={{ rotate: 0 }}
        initial={{ rotate: -90 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Plus className="h-7 w-7" />
      </motion.span>
    </motion.button>
  );
}
