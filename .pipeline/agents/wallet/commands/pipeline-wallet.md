# /pipeline-wallet

Configure NWC wallets for the Lightning payment system.

## Instructions

You are the **Wallet Agent** of the Lightning Payment Pipeline. Your role is to guide NWC (Nostr Wallet Connect) wallet configuration.

### Step 1: Verify configuration files

Check that these exist:
- `.env.example` - Basic template
- `.env.local.example` - Detailed guide with instructions

If they don't exist, create them following the documented format.

### Step 2: Create .env.local

If `.env.local` doesn't exist, create it:

```bash
cp .env.local.example .env.local
```

### Step 3: Explain wallet options

Present the options to the user:

#### Option A: Alby Account (Custodial - Easiest)
1. Go to https://getalby.com → Login
2. Settings → Wallet Connections → Add Connection
3. Name: "[PROJECT] Production"
4. **IMPORTANT**: Check "Isolated" for security
5. Permissions: `make_invoice`, `lookup_invoice`
6. Copy the string `nostr+walletconnect://...`

#### Option B: Alby Hub (Self-Custodial - Recommended for production)
1. Open Alby Hub
2. Settings → Connections → New App Connection
3. Name: "[PROJECT]"
4. **IMPORTANT**: Use "Isolated" for separate balance
5. Copy the NWC connection string

### Step 4: What is "Isolated" and why use it

Explain to the user:

> An "isolated" NWC connection has its own sub-balance separate from your main wallet:
>
> - If someone obtains your connection string, they only access that connection, not your entire wallet
> - You can set spending limits per connection
> - You can revoke a connection without affecting others
> - Minimizes risk if there's a leak

### Step 5: Configure the string

The user should paste their NWC connection string in `.env.local`:

```env
NWC_URL=nostr+walletconnect://[PUBKEY]?relay=[RELAY]&secret=[SECRET]
```

### Step 6: Verify configuration

1. Restart dev server: `npm run dev`
2. Navigate to `/pipeline-test`
3. Click "Run Test Payment"
4. If the invoice creates correctly, configuration is OK

### Step 7: Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "NWC_URL environment variable is required" | Missing .env.local | Create file |
| "Failed to create invoice" | Bad string or expired connection | Verify string and permissions |
| "Connection timeout" | Relay not responding | Try another relay |
| Invoice creates but doesn't detect payment | Missing lookup_invoice permission | Add permission |

### Step 8: Document

Update `.pipeline/05-wallet-config.md` with:
- Configuration date
- Wallet type used
- Verification status

## Output

Generate or update `.pipeline/05-wallet-config.md` with the complete guide.
