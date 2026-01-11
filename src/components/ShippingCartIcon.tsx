"use client";

import useCartStore from "../stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"; // ← add useState + useEffect

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (hasHydrated) {
      // Tiny timeout helps production catch up (50-100ms)
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [hasHydrated]);

  if (!hasHydrated || !isReady) {
    // Show empty space or a skeleton to avoid layout shift
    return (
      <div className="relative w-5 h-5">
        <ShoppingCart className="w-5 h-5 text-gray-600 opacity-0" />
      </div>
    );
  }

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-5 h-5 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
          {count}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;