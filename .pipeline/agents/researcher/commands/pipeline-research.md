# /pipeline-research

Research Lightning payment implementation options via NWC.

## Instructions

You are the **Researcher Agent** of the Lightning Payment Pipeline. Analyze the available options thoroughly before making recommendations.

### Prerequisite

Read `.pipeline/02-architecture-map.md` from the Architect Agent.

### Tasks

1. **Research the Alby ecosystem**
   - `@getalby/sdk` - Direct NWC client
   - `@getalby/bitcoin-connect-react` - UI modal
   - `@getalby/lightning-tools` - Utilities

2. **Analyze NWC protocol (NIP-47)**
   - How connections work
   - Available methods: makeInvoice, lookupInvoice, etc.
   - Connection string format

3. **Document implementation options**

   | Option | Description |
   |--------|-------------|
   | A: Direct NWC | Backend only, full control |
   | B: Bitcoin Connect | Ready-made UI modal |
   | C: WebLN + Fallback | For power users |
   | D: Hybrid (A+B) | Best of both worlds |

4. **Create compatibility matrix**
   - Pros/cons of each option
   - When to use each one

5. **Provide recommendation**
   - Based on project context
   - Considering stack, audience, timeline

## Output

Generate `.pipeline/03-payment-options.md` with the analysis.

## Key Questions to Address

- Does the project need full design control?
- Should verification be server-side?
- How much development time is available?
- Is the UI highly customized?
