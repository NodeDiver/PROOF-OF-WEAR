# PROOF-OF-WEAR

Experimental project to test Alby tools for Bitcoin/Lightning payment gateway integration.

## Goal

Add a Bitcoin/Lightning payment gateway using Alby's ecosystem.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env example and add your NWC connection string
cp .env.local.example .env.local

# Start dev server
npm run dev
```

## Testing Lightning Payments

### 1. Configure Your Wallet

Edit `.env.local` and paste your NWC connection string:

```env
NWC_URL=nostr+walletconnect://your-pubkey?relay=wss://relay.getalby.com/v1&secret=your-secret
```

> **Important**: Use an [isolated NWC connection](https://guides.getalby.com/user-guide/v/alby-account-and-browser-extension/alby-hub/wallet-connection-strings/isolated-nwc-connections) with a small balance for testing.

### 2. Test Page

After starting the dev server, visit:

👉 **[http://localhost:3000/pipeline-test](http://localhost:3000/pipeline-test)**

This page allows you to:
- Create a real Lightning invoice (1 sat)
- View the QR code
- Test payment flow without going through checkout

### 3. Full Payment Flow Test

1. Go to [http://localhost:3000](http://localhost:3000)
2. Add a product to cart
3. Go to checkout
4. Fill in the form
5. Click "Pay with Bitcoin"
6. Scan QR code with your Lightning wallet
7. Verify payment confirmation and redirect to success page

### Test Checklist

- [ ] Build compiles: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] Test page loads: `/pipeline-test`
- [ ] Invoice creates with real payment hash
- [ ] QR code is scannable
- [ ] Payment status updates after paying
- [ ] Checkout flow completes successfully

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Payments**: NWC (Nostr Wallet Connect) via `@getalby/sdk`
- **UI**: Bitcoin Connect modal via `@getalby/bitcoin-connect-react`
- **Styling**: Tailwind CSS (Neo-Brutalist design)
- **State**: Zustand (cart management)

## Resources

- [Alby Repositories](https://github.com/orgs/getAlby/repositories)
- [Alby Agent Skill](https://github.com/getAlby/alby-agent-skill) - AI agent integration for Lightning payments
- [NWC Protocol (NIP-47)](https://github.com/nostr-protocol/nips/blob/master/47.md)
- [Bitcoin Connect Docs](https://bitcoin-connect.com/)

## Pipeline Documentation

See `.pipeline/` folder for implementation docs:
- `01-site-analysis.md` - Site structure analysis
- `02-architecture-map.md` - Integration points
- `03-payment-options.md` - Payment options research
- `04-implementation-plan.md` - Implementation plan
- `05-wallet-config.md` - Wallet setup guide
- `06-test-results.md` - Test results

## Status

Lightning payment integration complete. Ready for testing.
