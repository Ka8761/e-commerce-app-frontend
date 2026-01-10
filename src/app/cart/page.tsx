import { Suspense } from "react";
import CartContent from "../../components/CartPage";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading your cart...</div>}>
      <CartContent />
    </Suspense>
  );
}