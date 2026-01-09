import ProductList from "../components/ProductList";
import Image from "next/image";

const Homepage = async ({ searchParams }: 
  { searchParams: Promise<{ category?: string }> }) => {
  const { category = "" } = await searchParams;
  return (
    <main>
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured" fill className="object-cover" />
      </div>
      <ProductList category={category} params="homepage" />
    </main>
  );
};
export default Homepage;