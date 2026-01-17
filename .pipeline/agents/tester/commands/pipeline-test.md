# /pipeline-test

Execute E2E tests for Lightning payments.

## Instructions

You are the **Tester Agent** of the Lightning Payment Pipeline. Your role is to verify everything works.

### Prerequisites

1. Complete implementation (Phase 6)
2. Configured wallet (`.env.local` with `NWC_URL`)
3. Dev server running (`npm run dev`)

### Test Page URL

```
http://localhost:3000/pipeline-test
```

This page allows:
- Creating real 1 sat invoice without going through checkout
- Viewing functional QR code
- Verifying NWC is connected
- Isolated payment testing

### Instructions for Devs (copy to README)

```markdown
## Testing Lightning Payments

### 1. Configure Your Wallet

Edit `.env.local` and paste your NWC connection string:
\`\`\`env
NWC_URL=nostr+walletconnect://your-pubkey?relay=wss://relay.getalby.com/v1&secret=your-secret
\`\`\`

> **Important**: Use an isolated NWC connection with a small balance for testing.

### 2. Test Page

After starting the dev server, visit:
**http://localhost:3000/pipeline-test**

### Test Checklist
- [ ] Build compiles: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] Test page loads: `/pipeline-test`
- [ ] Invoice creates with real payment hash
- [ ] QR code is scannable
- [ ] Payment status updates after paying
```

### Manual Tests

#### Test 1: Build
```bash
npm run build
```
- [ ] Compiles without errors
- [ ] All routes generated

#### Test 2: Invoice Creation
1. Go to `/pipeline-test`
2. Click "Run Test Payment"
3. Verify:
   - [ ] Order creates
   - [ ] Invoice creates (not fake)
   - [ ] QR code appears
   - [ ] Payment hash in log

#### Test 3: Complete Payment Flow
1. Go to homepage
2. Add product to cart (1 sat recommended)
3. Go to checkout
4. Fill form
5. Click "Pay with Bitcoin"
6. Verify:
   - [ ] Payment modal appears
   - [ ] QR code is scannable
   - [ ] Timer counts down
7. Pay with Lightning wallet
8. Verify:
   - [ ] Modal shows "Payment Confirmed!"
   - [ ] Redirect to /checkout/success
   - [ ] Cart clears

#### Test 4: Bitcoin Connect
1. In the modal, click "Pay with Wallet"
2. Verify:
   - [ ] Bitcoin Connect modal appears
   - [ ] Can connect wallet
   - [ ] Payment completes correctly

### Automated Tests (Playwright)

If Playwright is configured:

```typescript
test('should complete payment flow', async ({ page }) => {
  await page.goto('/pipeline-test');
  await page.click('[data-run-test]');
  await expect(page.locator('svg')).toBeVisible(); // QR code
});
```

## Output

Generate `.pipeline/06-test-results.md` with results.

## Output Format

```markdown
# 06 - Test Results

## Environment Status
[status table]

## Test Results
[checklist with results]

## Issues Found
[list of problems]

## Verification Checklist
[final checklist]
```
