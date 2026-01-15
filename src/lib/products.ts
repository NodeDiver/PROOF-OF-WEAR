import type { Product } from '@/types';

/**
 * Product catalog for PROOF OF WEAR
 * Prices in satoshis (demo prices)
 */
export const products: Product[] = [
  {
    id: 'tshirt-standard',
    slug: 'the-standard-tee',
    name: 'The Standard Tee',
    nameKey: 'products.tshirt.name',
    descriptionKey: 'products.tshirt.description',
    taglineKey: 'products.tshirt.tagline',
    priceInSats: 10,
    image: '/products/tshirt-main.svg',
    images: ['/products/tshirt-main.svg'],
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
  },
  {
    id: 'stickers-propaganda',
    slug: 'propaganda-pack',
    name: 'Propaganda Pack',
    nameKey: 'products.stickers.name',
    descriptionKey: 'products.stickers.description',
    taglineKey: 'products.stickers.tagline',
    priceInSats: 1,
    image: '/products/stickers-main.svg',
    images: ['/products/stickers-main.svg'],
    category: 'accessories',
    inStock: true,
    featured: true,
  },
];

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products;
}
