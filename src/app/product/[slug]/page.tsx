import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { ProductDetail } from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | PROOF OF WEAR',
    };
  }

  return {
    title: `${product.name} | PROOF OF WEAR`,
    description: `${product.name} - Bitcoin merch for real Bitcoiners. Pay with Lightning.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
