# Orchestration Prompt for Lightning Payment Pipeline

This document contains the prompt to give to Claude Code to launch the multi-agent orchestration flow that will add NWC-based Lightning payments to a website.

## Prerequisites

Before running this prompt:

1. **Clone the target repository** or have a Next.js e-commerce project ready
2. **Have Claude Code installed** with access to the project directory
3. **Have the agent definitions** in `.pipeline/agents/` (optional but recommended)

## The Orchestration Prompt

Copy and paste the following prompt to Claude Code:

---

```
I need you to act as an Orchestrator Agent and coordinate a multi-agent pipeline to add Bitcoin Lightning payment integration to this e-commerce website using NWC (Nostr Wallet Connect).

## Target Repository
- Original: https://github.com/NodeDiver/PROOF-OF-WEAR/tree/main
- Reference implementation: https://github.com/NodeDiver/PROOF-OF-WEAR/tree/01_nwc-custom

## Pipeline Overview

You will coordinate 8 specialized agents, each responsible for a specific phase:

### Phase 1: Scout Agent
Analyze the project structure:
- Identify framework, dependencies, folder structure
- Find checkout/cart components
- Map API routes
- Document i18n setup
- Check existing payment dependencies
- Output: `.pipeline/01-site-analysis.md`

### Phase 2: Architect Agent
Map integration points:
- Trace data flow: Product → Cart → Checkout → Payment
- Identify files to MODIFY (with exact lines)
- Identify files to CREATE
- Create Mermaid flow diagrams
- Output: `.pipeline/02-architecture-map.md`

### Phase 3: Researcher Agent
Evaluate payment options:
- Research Alby ecosystem (@getalby/sdk, bitcoin-connect-react)
- Analyze NWC protocol (NIP-47)
- Document implementation options:
  - Option A: Direct NWC (backend only, full control)
  - Option B: Bitcoin Connect (pre-built UI modal)
  - Option D: Hybrid (A + B combined)
- Provide recommendation based on project context
- Output: `.pipeline/03-payment-options.md`

### Phase 4: Human Decision
Present the options to me and wait for my selection before proceeding.

### Phase 5: Strategist Agent
Create implementation plan:
- List npm dependencies to install
- Plan type definitions
- Design API routes (POST /api/invoices, GET /api/invoices/[id]/status)
- Plan UI components
- Define atomic commit sequence
- Output: `.pipeline/04-implementation-plan.md`

### Phase 6: Builder Agent
Execute the plan:
- Follow the implementation plan exactly
- Write production-quality TypeScript code
- Create atomic git commits for each step
- Verify build passes after each step
- Use conventional commit format with Co-Authored-By

### Phase 7: Wallet Agent
Guide wallet configuration:
- Verify .env templates exist
- Explain Alby Account vs Alby Hub options
- Emphasize "isolated" connections for security
- Help configure NWC_URL in .env.local
- Output: `.pipeline/05-wallet-config.md`

### Phase 8: Tester Agent
Verify implementation:
- Run build verification
- Test invoice creation at /pipeline-test
- Document test results
- Output: `.pipeline/06-test-results.md`

## Execution Instructions

1. Create the `.pipeline/` folder if it doesn't exist
2. Execute each phase in order, generating the documentation
3. Use TodoWrite to track progress through all phases
4. At Phase 4, present the options and wait for my decision
5. After Phase 6, guide me through wallet setup
6. After Phase 8, confirm the pipeline is complete

## Implementation Requirements

- Use @getalby/sdk for NWC client
- Use @getalby/bitcoin-connect-react for payment UI (if Option B or D)
- Create NWC client as singleton in lib/nwc.ts
- Add invoice creation API at /api/invoices
- Add status polling API at /api/invoices/[id]/status
- Integrate payment modal in checkout flow
- Add /pipeline-test page for isolated testing
- Support i18n for payment-related strings

## Commit Convention

Each commit should follow this format:
```
feat(scope): short description

- Detail 1
- Detail 2

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Start the Pipeline

Begin with Phase 1 (Scout) now. Analyze this codebase and create the site analysis document.
```

---

## Alternative: Quick Start Prompt

If you just want to run the pipeline quickly without detailed instructions:

```
Run the Lightning Payment Pipeline on this project:

1. Analyze the codebase structure
2. Map integration points for payments
3. Research NWC implementation options
4. Present options A (Direct NWC), B (Bitcoin Connect), or D (Hybrid)
5. Create detailed implementation plan based on my choice
6. Implement the code with atomic commits
7. Guide wallet configuration
8. Test and verify the implementation

Generate documentation in .pipeline/ folder at each step.
Track progress with TodoWrite.

Reference implementation: https://github.com/NodeDiver/PROOF-OF-WEAR/tree/01_nwc-custom

Start with the site analysis now.
```

---

## Slash Command Version

If your Claude Code installation has the pipeline skills installed:

```
/pipeline-run
```

This single command will orchestrate the entire pipeline automatically.

---

## Expected Output

After running the pipeline, you should have:

### Documentation (in `.pipeline/`)
- `01-site-analysis.md` - Project structure analysis
- `02-architecture-map.md` - Integration architecture
- `03-payment-options.md` - Payment method comparison
- `04-implementation-plan.md` - Step-by-step plan
- `05-wallet-config.md` - Wallet setup guide
- `06-test-results.md` - Test verification results

### Code Changes
- Dependencies: `@getalby/sdk`, `@getalby/bitcoin-connect-react`
- New files: NWC client, API routes, payment components
- Modified files: Checkout flow, providers, types
- Git history: 10-15 atomic commits

### Functional Features
- Real Lightning invoice creation via NWC
- QR code payment display
- Payment status polling
- Bitcoin Connect wallet integration
- Checkout success flow
- Test page at `/pipeline-test`

---

## Troubleshooting

### Pipeline Stops at Phase 4
This is expected! The pipeline waits for your decision on which implementation approach to use. Choose A, B, or D and tell Claude to continue.

### Build Errors During Phase 6
Claude will attempt to fix TypeScript errors. If build keeps failing, check:
- All imports are correct
- Types are properly extended
- Server/client boundary is respected

### Wallet Connection Issues
After Phase 7:
1. Verify NWC_URL is set in `.env.local`
2. Restart the dev server
3. Check connection permissions (needs `make_invoice`, `lookup_invoice`)
4. Test at `/pipeline-test` page

---

## Reference

- **Source repository:** https://github.com/NodeDiver/PROOF-OF-WEAR/tree/main
- **Result repository:** https://github.com/NodeDiver/PROOF-OF-WEAR/tree/01_nwc-custom
- **Agent definitions:** `.pipeline/agents/`
- **Flow diagrams:** `.pipeline/flow.md`
