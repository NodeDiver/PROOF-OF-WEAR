# 🎯 PROOF OF WEAR - Complete Project Prompt

> Este documento contiene el prompt completo y expandido utilizado para generar el proyecto "Proof of Wear", una tienda Neo-Brutalista de merchandise Bitcoin. Puede ser usado como referencia, documentación de diseño, o como base para proyectos similares.

---

## 📋 PROJECT OVERVIEW

```yaml
Project Name: Proof of Wear
Type: E-commerce Landing Page + Mini Shop
Industry: Bitcoin / Cryptocurrency Merchandise
Target Audience: Bitcoiners, crypto enthusiasts, maximalists
Tone: Bold, unapologetic, rebellious, minimalist-maximalist hybrid
```

---

## 🛠️ TECHNICAL STACK

```yaml
Framework: Next.js 15 (App Router)
React: 19
Language: TypeScript (strict mode)
Styling: Tailwind CSS 4
UI Components: Custom Neo-Brutalist components (shadcn/ui architecture)
State Management: Zustand 5 (with persist middleware)
Animations: Framer Motion 11 + CSS animations
Internationalization: next-intl 3
Icons: Lucide React
Fonts: 
  - Display: Bebas Neue (Google Fonts)
  - Body: Space Grotesk (Google Fonts)  
  - Mono: Space Mono (Google Fonts)
```

---

## 🎨 DESIGN SYSTEM: Neo-Brutalist / Hard-Edge Brutalism

### Core Visual Principles

```yaml
Shadows: 
  - ZERO soft shadows
  - Only hard offset shadows (4-8px offset, solid color)
  - Shadow moves on interaction (pressed effect)

Borders:
  - Thick black borders on EVERYTHING (3-4px minimum)
  - No border-radius OR maximum 2px
  - Elements must feel "cut" not "rounded"

Aesthetic:
  - Raw, unapologetic, in-your-face
  - High visual weight - nothing should feel "light" or "airy"
  - Intentional "roughness" - embrace imperfection as a feature
  - Grid-breaking layouts - elements can overlap, stack aggressively
  - Typography as visual element - text can be HUGE and decorative

Textures:
  - Subtle noise/grain overlay (CSS SVG filter, 3% opacity)
  - Grid pattern backgrounds (optional, low opacity)
```

### Color Palette

#### Light Mode
```css
--background: #FDF6E3;        /* Warm cream/parchment */
--foreground: #0D0D0D;        /* Near-black */
--card: #FFFFFF;              /* Pure white */
--card-foreground: #0D0D0D;   /* Near-black */
--border: #0D0D0D;            /* Always black, always thick */
--muted: #F5EFDC;             /* Slightly darker cream */
--muted-foreground: #4A4A4A;  /* Medium gray */
--accent: #F7931A;            /* Bitcoin Orange */
--accent-foreground: #0D0D0D; /* Black on orange */
--shadow-color: #0D0D0D;      /* Black shadows */

/* Accent Colors */
--bitcoin: #F7931A;           /* Primary accent - Bitcoin Orange */
--bitcoin-light: #FFB84D;     /* Lighter orange */
--bitcoin-dark: #CC7A15;      /* Darker orange */
--fire: #FF4136;              /* Secondary accent - Aggressive Red */
--fire-light: #FF6B5C;        /* Lighter red */
--fire-dark: #CC342B;         /* Darker red */
--ember: #FF6B35;             /* Tertiary accent - Burnt Orange */
```

#### Dark Mode
```css
--background: #0D0D0D;        /* Deep black */
--foreground: #FDF6E3;        /* Cream text */
--card: #1A1A1A;              /* Slightly lighter black */
--card-foreground: #FDF6E3;   /* Cream text */
--border: #F7931A;            /* Orange borders (key difference) */
--muted: #1F1F1F;             /* Dark gray */
--muted-foreground: #A3A3A3;  /* Light gray */
--accent: #F7931A;            /* Bitcoin Orange (same) */
--accent-foreground: #0D0D0D; /* Black on orange */
--shadow-color: #F7931A;      /* Orange shadows (key difference) */
```

### Typography Scale

```css
/* Headlines - Bebas Neue */
--font-display: 'Bebas Neue', sans-serif;
font-weight: 400-700;
text-transform: uppercase;
letter-spacing: 0.02em;

/* Sizes */
h1: clamp(3rem, 8vw, 8rem);   /* Hero titles */
h2: clamp(2.5rem, 6vw, 4rem); /* Section titles */
h3: clamp(1.5rem, 4vw, 2rem); /* Card titles */

/* Body - Space Grotesk */
--font-body: 'Space Grotesk', sans-serif;
font-weight: 400-700;
line-height: 1.6;

/* Mono - Space Mono */
--font-mono: 'Space Mono', monospace;
font-weight: 400-700;
/* Used for: prices, badges, technical info */
```

---

## 🧩 UI COMPONENTS SPECIFICATION

### Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'fire' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

/* Behavior */
- Default state: 4px hard shadow offset
- Hover: shadow reduces to 2px, button shifts 2px down-right
- Active/Click: shadow disappears completely, button shifts 4px down-right
- Transition: 100ms, ease-out

/* Styling */
- Border: 3px solid var(--border)
- Font: var(--font-display), uppercase
- No border-radius
```

### Card Component

```typescript
interface CardProps {
  hover?: boolean;  // Enable hover animation
  accent?: boolean; // Use accent color shadow
}

/* Behavior */
- Default: 4px hard shadow
- Hover (if enabled): 8px shadow, card shifts -2px up-left
- Transition: 100ms

/* Structure */
- CardHeader: padding + bottom border
- CardContent: padding
- CardFooter: padding + top border
```

### Input Component

```typescript
interface InputProps {
  label?: string;
  error?: string;
}

/* Behavior */
- Default: 3px border, no shadow
- Focus: accent color border + 4px accent shadow
- Error: fire color border + fire shadow

/* Styling */
- Font: var(--font-body)
- Placeholder: muted-foreground color
```

### Badge Component

```typescript
interface BadgeProps {
  variant: 'default' | 'fire' | 'outline';
}

/* Styling */
- Font: var(--font-mono), uppercase, text-xs
- Border: 2px solid
- Padding: px-2 py-1
```

### QuantitySelector Component

```yaml
Layout: Horizontal inline-flex
Buttons: - and + with thick borders
Display: Monospace number in center
Min/Max: Configurable (default 1-99)
```

### SizeSelector Component

```yaml
Layout: Flex wrap with gap
Options: Array of size strings
Selected: Bitcoin orange background + shadow
Unselected: Card background, hover shows muted
```

---

## 📐 LAYOUT STRUCTURE

### Global Layout

```
┌─────────────────────────────────────────┐
│ HEADER (sticky, 64-80px height)         │
│ ┌─────┬───────────────────┬───────────┐ │
│ │Logo │                   │Lang│Theme│Cart│
│ └─────┴───────────────────┴───────────┘ │
├─────────────────────────────────────────┤
│ MAIN CONTENT (flex-1)                   │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│ FOOTER                                  │
│ ┌─────────────────────────────────────┐ │
│ │ MARQUEE (animated)                  │ │
│ ├─────────────────────────────────────┤ │
│ │ Logo + Tagline        │ Bitcoin Badge │
│ ├─────────────────────────────────────┤ │
│ │ Copyright / Rights                  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Hero Section

```
┌─────────────────────────────────────────┐
│ Height: min-h-[90vh]                    │
│ Background: Grid pattern (5% opacity)   │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │   [Sticker Badge: ₿ Bitcoin Merch]  │ │
│ │           -rotate-2                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│         ██████╗ ██████╗  ██████╗        │
│         ██╔══██╗██╔══██╗██╔═══██╗       │
│         ██████╔╝██████╔╝██║   ██║       │
│         ██╔═══╝ ██╔══██╗██║   ██║       │
│         ██║     ██║  ██║╚██████╔╝       │
│         ╚═╝     ╚═╝  ╚═╝ ╚═════╝        │
│              PROOF                      │
│           OF WEAR (orange)              │
│                                         │
│    "Not your keys, not your coins.      │
│     But this merch? 100% yours."        │
│                                         │
│         [⚡ Stack Gear Button]          │
│                                         │
│              ↓ Scroll                   │
└─────────────────────────────────────────┘
```

### Products Section

```
┌─────────────────────────────────────────┐
│ THE GOODS                               │
│ "Two essentials. No BS."                │
│                                         │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ [T-SHIRT CARD]  │ │ [STICKERS CARD] │ │
│ │  -rotate-1      │ │   rotate-1      │ │
│ │                 │ │   mt-8 (offset) │ │
│ │ ┌─────────────┐ │ │ ┌─────────────┐ │ │
│ │ │   IMAGE     │ │ │ │   IMAGE     │ │ │
│ │ │  [sticker]  │ │ │ │  [sticker]  │ │ │
│ │ └─────────────┘ │ │ └─────────────┘ │ │
│ │ Title           │ │ Title           │ │
│ │ Description     │ │ Description     │ │
│ │ ₿ 10 sats  [→]  │ │ ₿ 1 sat   [→]   │ │
│ │ [S][M][L][XL]   │ │                 │ │
│ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────┘
```

### Product Detail Page

```
┌─────────────────────────────────────────┐
│ ← Back                                  │
│                                         │
│ ┌─────────────────┬───────────────────┐ │
│ │                 │ [APPAREL]         │ │
│ │   MAIN IMAGE    │                   │ │
│ │   ┌─────────┐   │ THE STANDARD TEE  │ │
│ │   │ corners │   │ "Wear the revolution"│
│ │   │ accents │   │                   │ │
│ │   └─────────┘   │ ₿ 10 sats         │ │
│ │                 │                   │ │
│ │ [thumb] [thumb] │ Description text  │ │
│ │                 │ ─────────────────  │ │
│ │                 │ SIZE: [S][M][L]...│ │
│ │                 │ QTY:  [-] 1 [+]   │ │
│ │                 │                   │ │
│ │                 │ [ADD TO CART]     │ │
│ │                 │ ✓ In Stock        │ │
│ └─────────────────┴───────────────────┘ │
└─────────────────────────────────────────┘
```

### Cart Drawer

```
┌────────────────────────┐
│ 🛒 YOUR STACK      [X] │ ← Header
├────────────────────────┤
│                        │
│ ┌──────────────────┐   │
│ │[img] Title       │   │
│ │      Size: M     │   │
│ │      ₿ 10 sats   │   │
│ │ [-]1[+]  Remove  │   │
│ └──────────────────┘   │
│                        │
│ ┌──────────────────┐   │
│ │[img] Stickers    │   │
│ │      ₿ 1 sat     │   │
│ │ [-]2[+]  Remove  │   │
│ └──────────────────┘   │
│                        │ ← Scrollable
├────────────────────────┤
│ TOTAL      ₿ 12 sats   │
│                        │
│ [PROCEED TO CHECKOUT]  │
│ [Continue Shopping]    │
└────────────────────────┘ ← Footer (sticky)
```

### Checkout Page

```
┌─────────────────────────────────────────┐
│              CHECKOUT                   │
│                                         │
│ ┌───────────────────┬─────────────────┐ │
│ │ SHIPPING INFO     │ ORDER SUMMARY   │ │
│ │ ┌───────────────┐ │ ┌─────────────┐ │ │
│ │ │ Email         │ │ │[img] Item 1 │ │ │
│ │ └───────────────┘ │ │     ₿ 10    │ │ │
│ │ ┌───────────────┐ │ ├─────────────┤ │ │
│ │ │ Full Name     │ │ │[img] Item 2 │ │ │
│ │ └───────────────┘ │ │     ₿ 2     │ │ │
│ │ ┌───────────────┐ │ ├─────────────┤ │ │
│ │ │ Address       │ │ │ TOTAL       │ │ │
│ │ └───────────────┘ │ │ ₿ 12 sats   │ │ │
│ │ ┌───────┬───────┐ │ └─────────────┘ │ │
│ │ │ City  │Postal │ │                 │ │
│ │ └───────┴───────┘ │                 │ │
│ │ ┌───────────────┐ │                 │ │
│ │ │ Country       │ │                 │ │
│ │ └───────────────┘ │                 │ │
│ │                   │                 │ │
│ │ ⚡ Payment note   │                 │ │
│ │ ⚠️ Integration    │                 │ │
│ │                   │                 │ │
│ │ [⚡ PAY WITH BTC] │                 │ │
│ └───────────────────┴─────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🎭 MICRO-INTERACTIONS & ANIMATIONS

### Button Press Effect
```css
/* Default state */
box-shadow: 4px 4px 0px 0px var(--shadow-color);
transform: translate(0, 0);

/* Hover */
box-shadow: 2px 2px 0px 0px var(--shadow-color);
transform: translate(2px, 2px);

/* Active/Click */
box-shadow: 0px 0px 0px 0px var(--shadow-color);
transform: translate(4px, 4px);

/* Transition */
transition: all 100ms ease-out;
```

### Card Hover Effect
```css
/* Default */
box-shadow: 4px 4px 0px 0px var(--shadow-color);
transform: translate(0, 0);

/* Hover */
box-shadow: 8px 8px 0px 0px var(--shadow-color);
transform: translate(-2px, -2px);
```

### Cart Badge Pop
```css
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-pop {
  animation: pop 0.3s ease-out;
}
```

### Marquee Animation
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}
```

### Theme Toggle
```yaml
Behavior: Instant switch (no transition)
Rationale: Brutalist = immediate, no smoothing
```

### Page Transitions
```yaml
Type: Hard cuts or slide
Avoid: Fades, morphs, smooth interpolations
Duration: 150-250ms maximum
Easing: Steps or sharp curves
```

---

## 🌍 INTERNATIONALIZATION (i18n)

### Supported Locales
```typescript
export const locales = ['en', 'es'] as const;
export type Locale = 'en' | 'es';
export const defaultLocale = 'en';
```

### Detection Strategy
```yaml
1. Check cookie 'locale'
2. Fallback to Accept-Language header
3. Default to 'en'
```

### Translation Structure
```
src/locales/
├── en/
│   └── messages.json
└── es/
    └── messages.json
```

### Key Namespaces
```json
{
  "common": { /* Shared UI elements */ },
  "hero": { /* Hero section */ },
  "marquee": { /* Scrolling text */ },
  "products": { /* Product info */ },
  "cart": { /* Cart drawer */ },
  "checkout": { /* Checkout form */ },
  "footer": { /* Footer content */ },
  "sizes": { /* Size labels */ },
  "theme": { /* Theme toggle */ },
  "language": { /* Language toggle */ }
}
```

---

## 🛒 PRODUCTS DATA

### T-Shirt: "The Standard Tee"
```typescript
{
  id: 'tshirt-standard',
  slug: 'the-standard-tee',
  name: 'The Standard Tee',
  nameKey: 'products.tshirt.name',
  descriptionKey: 'products.tshirt.description',
  taglineKey: 'products.tshirt.tagline',
  priceInSats: 10,  // Demo price
  image: '/products/tshirt-main.svg',
  images: ['/products/tshirt-main.svg', '/products/tshirt-back.svg'],
  category: 'apparel',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  inStock: true,
  featured: true,
}
```

### Stickers: "Propaganda Pack"
```typescript
{
  id: 'stickers-propaganda',
  slug: 'propaganda-pack',
  name: 'Propaganda Pack',
  nameKey: 'products.stickers.name',
  descriptionKey: 'products.stickers.description',
  taglineKey: 'products.stickers.tagline',
  priceInSats: 1,  // Demo price
  image: '/products/stickers-main.svg',
  images: ['/products/stickers-main.svg', '/products/stickers-spread.svg'],
  category: 'accessories',
  inStock: true,
  featured: true,
}
```

---

## 🛍️ CART STATE MANAGEMENT

### Zustand Store Structure
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
}

interface CartState {
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
```

### Persistence
```typescript
persist(
  (set, get) => ({ /* store */ }),
  {
    name: 'pow-cart',
    partialize: (state) => ({ items: state.items }),
  }
)
```

---

## 💳 PAYMENT INTEGRATION SPECIFICATION

### Integration Point
```typescript
// Location: src/components/checkout/CheckoutForm.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // ============================================
  // CUSTOM BITCOIN PAYMENT INTEGRATION POINT
  // ============================================
  
  // Step 1: Create order in backend
  const order = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      })),
      customer: {
        email: formData.email,
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      totalSats: getTotal(),
    }),
  });

  // Step 2: Generate Bitcoin Lightning invoice
  const invoice = await fetch('/api/invoices', {
    method: 'POST',
    body: JSON.stringify({
      orderId: order.id,
      amountSats: getTotal(),
    }),
  });

  // Step 3: Redirect to custom payment gateway
  // (Similar to BTCPayServer but custom implementation)
  window.location.href = invoice.paymentUrl;
  
  // Alternative: Show Lightning QR code in modal
  // setPaymentModal({ invoice: invoice.bolt11, ... });
};
```

### Expected Backend API
```yaml
POST /api/orders:
  Request:
    - items: CartItem[]
    - customer: CustomerInfo
    - totalSats: number
  Response:
    - orderId: string
    - status: 'pending'

POST /api/invoices:
  Request:
    - orderId: string
    - amountSats: number
  Response:
    - invoiceId: string
    - bolt11: string
    - paymentUrl: string
    - expiresAt: timestamp

Webhook /api/webhooks/payment:
  - Receives payment confirmation
  - Updates order status
  - Triggers confirmation email
```

---

## 📁 FILE STRUCTURE

```
proof-of-wear/
├── public/
│   ├── favicon.svg              # Browser favicon
│   ├── logo.svg                 # Horizontal logo
│   ├── logo-square.svg          # Square logo (for PNG/social)
│   └── products/
│       ├── tshirt-main.svg      # T-shirt front view
│       ├── tshirt-back.svg      # T-shirt back view
│       ├── stickers-main.svg    # Sticker pack image
│       └── stickers-spread.svg  # Stickers spread out
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + custom styles
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page (landing)
│   │   ├── loading.tsx          # Loading spinner
│   │   ├── not-found.tsx        # 404 page
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Product detail page
│   │   └── checkout/
│   │       └── page.tsx         # Checkout page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Brutalist button
│   │   │   ├── Card.tsx         # Brutalist card
│   │   │   ├── Input.tsx        # Brutalist input
│   │   │   ├── Badge.tsx        # Brutalist badge
│   │   │   ├── QuantitySelector.tsx
│   │   │   ├── SizeSelector.tsx
│   │   │   └── index.ts         # Exports
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Site header
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   ├── ThemeToggle.tsx  # Dark/light toggle
│   │   │   ├── LanguageToggle.tsx # EN/ES toggle
│   │   │   ├── CartButton.tsx   # Cart icon with count
│   │   │   └── index.ts
│   │   ├── product/
│   │   │   ├── ProductCard.tsx  # Product grid card
│   │   │   ├── ProductDetail.tsx # Full product view
│   │   │   └── index.ts
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx   # Slide-out cart
│   │   │   └── index.ts
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx # Checkout form
│   │   │   └── index.ts
│   │   └── icons/
│   │       ├── Logo.tsx         # SVG logo component
│   │       └── index.ts
│   ├── lib/
│   │   ├── products.ts          # Product data & types
│   │   ├── store.ts             # Zustand cart store
│   │   └── utils.ts             # Utility functions (cn, etc.)
│   ├── locales/
│   │   ├── en/
│   │   │   └── messages.json    # English translations
│   │   └── es/
│   │       └── messages.json    # Spanish translations
│   └── i18n.ts                  # i18n configuration
├── .gitignore
├── next.config.mjs              # Next.js config with i18n
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts           # Tailwind with brutalist theme
├── tsconfig.json
├── prompt.md                    # This file
└── README.md                    # Project documentation
```

---

## ✨ SPECIAL BRUTALIST TOUCHES

### Random Rotations
```css
.rotate-brutal-1 { transform: rotate(1deg); }
.rotate-brutal-2 { transform: rotate(2deg); }
.rotate-brutal-3 { transform: rotate(3deg); }
.-rotate-brutal-1 { transform: rotate(-1deg); }
.-rotate-brutal-2 { transform: rotate(-2deg); }
.-rotate-brutal-3 { transform: rotate(-3deg); }
```

### Sticker Elements
```css
.sticker {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-display);
  font-size: 0.875rem;
  text-transform: uppercase;
  background-color: var(--accent);
  color: var(--accent-foreground);
  border: 2px solid var(--border);
  transform: rotate(-2deg);
}
```

### Noise Overlay
```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,...noise-filter...");
}
```

### Marquee Banner
```css
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  border-top: 3px solid var(--border);
  border-bottom: 3px solid var(--border);
  background-color: var(--accent);
  padding: 0.5rem 0;
}
```

### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--background);
  border-left: 3px solid var(--border);
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border: 3px solid var(--border);
}
```

### Decorative Corner Accents
```tsx
{/* On images/cards */}
<div className="absolute top-0 left-0 w-8 h-8 border-r-[3px] border-b-[3px] border-bitcoin" />
<div className="absolute top-0 right-0 w-8 h-8 border-l-[3px] border-b-[3px] border-bitcoin" />
<div className="absolute bottom-0 left-0 w-8 h-8 border-r-[3px] border-t-[3px] border-bitcoin" />
<div className="absolute bottom-0 right-0 w-8 h-8 border-l-[3px] border-t-[3px] border-bitcoin" />
```

---

## 📝 CONTENT COPY TONE

### Voice Guidelines
```yaml
Tone: Direct, no bullshit
Energy: Bitcoin maximalist
Sentences: Short. Punchy.
Attitude: Irreverent and rebellious
Slang: HODL, Stack Sats, Stay Humble, Proof of Work
```

### Example Copy
```
Hero:
- "Not your keys, not your coins. But this merch? 100% yours."

Products:
- "Proof of Work on your chest. Premium cotton, bold statement."
- "5 premium vinyl stickers. Spread the signal everywhere you go."

Taglines:
- "Wear your conviction."
- "Wear the revolution."
- "Spread the signal."

CTA:
- "Stack Gear"
- "Pay with Bitcoin"

Footer:
- "Hard money deserves hard merch."
- "No rights reserved. Fork this."
- "Built for Bitcoiners"

Badges:
- "₿ > 🖨️" (Bitcoin > Money Printer)
- "21M ONLY"
- "PROOF OF WORK"
```

---

## 🚀 DEPLOYMENT CHECKLIST

```yaml
Pre-launch:
  - [ ] Replace placeholder product images
  - [ ] Set real product prices
  - [ ] Connect payment gateway
  - [ ] Configure webhooks
  - [ ] Set up order management backend
  - [ ] Test complete purchase flow
  - [ ] Verify i18n in both languages
  - [ ] Test responsive breakpoints
  - [ ] Verify dark/light mode
  - [ ] Check accessibility (a11y)
  - [ ] Configure analytics
  - [ ] Set up error tracking

Environment Variables:
  - NEXT_PUBLIC_API_URL
  - NEXT_PUBLIC_PAYMENT_GATEWAY_URL
  - DATABASE_URL (backend)
  - LIGHTNING_NODE_URL (backend)
```

---

## 🔧 COMMANDS

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

---

## 📚 REFERENCES

### Design Inspiration
- Brutalist Web Design (brutalistwebsites.com)
- Neo-Brutalism UI trend (2023-2024)
- Bitcoin brand guidelines
- Gumroad's brutalist redesign
- Figma's bold UI patterns

### Technical Resources
- Next.js 15 App Router docs
- Tailwind CSS v4 docs
- Zustand documentation
- next-intl documentation
- Framer Motion docs

---

*Last updated: January 2026*
*Version: 1.0.0*
