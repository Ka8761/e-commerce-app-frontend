import ProductList from "@/components/ProductList";

interface ProductsPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ category?: string }> }) => {
  const { category = "" } = await searchParams;
  return (
    <div className="mt-12">
      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;