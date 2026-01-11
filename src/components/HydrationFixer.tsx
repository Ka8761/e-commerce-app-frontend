// components/HydrationFixer.tsx
"use client";

import { useEffect } from "react";
import useCartStore from "../stores/cartStore";

export default function HydrationFixer() {
  useEffect(() => {
    // Force Zustand to rehydrate if needed
    useCartStore.persist.rehydrate?.(); // If using persist middleware
    useCartStore.getState(); // Just touch it to trigger
  }, []);

  return null; // Invisible
}