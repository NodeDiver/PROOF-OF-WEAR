# Proof of Wear 🧡

A Neo-Brutalist Bitcoin merch store built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

![Proof of Wear](./public/products/tshirt-main.svg)

## ✨ Features

- **Neo-Brutalist Design**: Bold borders, hard shadows, high contrast, raw aesthetic
- **Light/Dark Mode**: Full theme support with Bitcoin orange accents
- **Internationalization**: English and Spanish (easily extensible)
- **Shopping Cart**: Persistent cart with Zustand
- **Responsive**: Mobile-first design
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom brutalist components (shadcn-style)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **i18n**: next-intl

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd proof-of-wear

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
proof-of-wear/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── products/
│       ├── tshirt-main.svg
│       ├── tshirt-back.svg
│       ├── stickers-main.svg
│       └── stickers-spread.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── product/[slug]/page.tsx
│   │   └── checkout/page.tsx
│   ├── components/
│   │   ├── ui/           # Brutalist UI components
│   │   ├── layout/       # Header, Footer, Theme toggle
│   │   ├── product/      # Product cards, detail
│   │   ├── cart/         # Cart drawer
│   │   ├── checkout/     # Checkout form
│   │   └── icons/        # Logo components
│   ├── lib/
│   │   ├── products.ts   # Product data
│   │   ├── store.ts      # Zustand cart store
│   │   └── utils.ts      # Utility functions
│   ├── locales/
│   │   ├── en/messages.json
│   │   └── es/messages.json
│   └── i18n.ts           # i18n configuration
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 💳 Payment Integration

The checkout flow is ready for Bitcoin payment integration. When the user clicks "Pay with Bitcoin":

```typescript
// In src/components/checkout/CheckoutForm.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Create order in your backend
  const order = await createOrder({
    items,
    customer: formData,
    total: getTotal(),
  });
  
  // 2. Generate Bitcoin/Lightning invoice from your payment gateway
  const invoice = await generateInvoice({
    orderId: order.id,
    amount: getTotal(),
    currency: 'sats',
  });
  
  // 3. Redirect to payment page
  window.location.href = invoice.paymentUrl;
  
  // OR show Lightning QR code in a modal
  setPaymentInvoice(invoice);
};
```

### Integration Points:

1. **Backend API**: Create endpoints for order management
2. **Payment Gateway**: Integrate with your BTCPayServer-like solution
3. **Webhooks**: Handle payment confirmations
4. **Order Status**: Track and display order status

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  bitcoin: {
    DEFAULT: '#F7931A',  // Bitcoin orange
    light: '#FFB84D',
    dark: '#CC7A15',
  },
  fire: {
    DEFAULT: '#FF4136',  // Accent red
  },
  // ...
}
```

### Translations

Add new languages by creating files in `src/locales/`:

```
src/locales/
├── en/messages.json
├── es/messages.json
└── pt/messages.json  # Add Portuguese
```

Update `src/i18n.ts`:

```typescript
export const locales = ['en', 'es', 'pt'] as const;
```

### Products

Edit `src/lib/products.ts` to add or modify products:

```typescript
export const products: Product[] = [
  {
    id: 'new-product',
    slug: 'new-product-slug',
    name: 'New Product',
    nameKey: 'products.newProduct.name',
    // ...
  },
];
```

## 🖼️ Replacing Placeholder Images

The current product images are SVG placeholders. Replace them with real product photos:

1. Add images to `/public/products/`
2. Update image paths in `src/lib/products.ts`
3. Recommended formats: WebP or optimized PNG
4. Recommended size: 800x800px minimum

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Environment Variables

Create `.env.local` for environment-specific config:

```env
# API endpoints
NEXT_PUBLIC_API_URL=https://api.yoursite.com

# Payment gateway
NEXT_PUBLIC_PAYMENT_GATEWAY_URL=https://pay.yoursite.com
```

## 📄 License

MIT License - Feel free to fork and modify!

---

**Stack Sats. Wear Proof.** 🧡
