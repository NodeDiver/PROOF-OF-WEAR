// ===========================================
// PROOF OF WEAR - Core TypeScript Interfaces
// Architecture by Arqui @ Oryon
// ===========================================

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  nameKey: string;
  descriptionKey: string;
  taglineKey: string;
  priceInSats: number;
  image: string;
  images: string[];
  category: 'apparel' | 'accessories';
  sizes?: string[];
  inStock: boolean;
  featured: boolean;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (productId: string, quantity?: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  getItemCount: () => number;
  getTotal: () => number;
}

// Customer Types
export interface CustomerInfo {
  email: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

// Order Types
export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  totalSats: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
}

// Payment Types (Alby/Lightning)
export interface LightningInvoice {
  invoiceId: string;
  bolt11: string;
  paymentHash: string;
  amountSats: number;
  expiresAt: Date;
  status: 'pending' | 'paid' | 'expired';
}

export interface PaymentRequest {
  orderId: string;
  amountSats: number;
}

export interface PaymentResponse {
  invoice: LightningInvoice;
  paymentUrl?: string;
}

// Extended Payment Types for NWC
export interface NWCInvoice {
  invoiceId: string;
  orderId: string;
  bolt11: string;
  paymentHash: string;
  amountSats: number;
  description: string;
  status: 'pending' | 'paid' | 'expired';
  expiresAt: string;
  paidAt?: string;
}

export interface PaymentStatusResponse {
  paymentHash: string;
  status: 'pending' | 'paid' | 'expired';
  paid: boolean;
  preimage?: string | null;
  paidAt?: string | null;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'fire' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  hover?: boolean;
  accent?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export interface BadgeProps {
  variant?: 'default' | 'fire' | 'outline';
  children: React.ReactNode;
  className?: string;
}

// Locale Types
export type Locale = 'en' | 'es';
