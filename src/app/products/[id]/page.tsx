import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock data fetch (replace with DB call later)
const getProduct = (id: string): ProductType | undefined => {
  // In a real app: return await db.product.findUnique({ where: { id } })
  return products.find(p => p.id === parseInt(id)); 
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string; size?: string }>;
}) => {
  // Await the promises (Required in Next.js 15)
  const { id } = await params;
  const { size, color } = await searchParams;

  const product = getProduct(id);
  if (!product) notFound();

  // Fallbacks if color/size aren't in URL
  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];
  
  // Safety check for image
  const displayImage = product.images[selectedColor] || product.images[product.colors[0]];

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          priority
          className="object-contain rounded-md"
        />
      </div>
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
        
        {/* Payment Icons */}
        <div className="flex items-center gap-2 mt-4">
            <Image src="/klarna.png" alt="klarna" width={50} height={25} />
            <Image src="/cards.png" alt="cards" width={50} height={25} />
            <Image src="/stripe.png" alt="stripe" width={50} height={25} />
        </div>
        <p className="text-gray-400 text-xs mt-2">
            Secure checkout. Terms & Conditions apply.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;