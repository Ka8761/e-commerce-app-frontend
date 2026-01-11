"use client";

import useCartStore from "../stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const count = useCartStore((state) =>
    state.cart.reduce((a, b) => a + b.quantity, 0)
  );

  const hasHydrated = useCartStore((state) => state.hasHydrated);

  if (!hasHydrated) return null; // Prevents hydration issues from Zustand store

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
          {count}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;
