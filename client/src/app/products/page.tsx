import ProductList from "@/components/ProductList";

interface ProductsPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const category = params?.category || "";

  return (
    <div>
      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;