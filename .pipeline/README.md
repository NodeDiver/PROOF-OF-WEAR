# Lightning Payment Pipeline

A multi-agent system for integrating Bitcoin Lightning payments via NWC (Nostr Wallet Connect) into e-commerce projects.

## Overview

This pipeline uses 8 specialized AI agents to analyze, plan, and implement Lightning payment integration. Each agent handles a specific phase of the process, producing documentation and code that builds upon previous phases.

## Quick Start

Run the complete pipeline:
```
/pipeline-run
```

Or run individual phases:
```
/pipeline-scout      # Analyze project
/pipeline-architect  # Map integration points
/pipeline-research   # Evaluate options
/pipeline-plan       # Create implementation plan
/pipeline-build      # Write code
/pipeline-wallet     # Configure wallet
/pipeline-test       # Verify implementation
```

## Pipeline Phases

| Phase | Agent | Command | Output |
|-------|-------|---------|--------|
| 1 | Scout | `/pipeline-scout` | `01-site-analysis.md` |
| 2 | Architect | `/pipeline-architect` | `02-architecture-map.md` |
| 3 | Researcher | `/pipeline-research` | `03-payment-options.md` |
| 4 | Human | *(decision point)* | Select implementation option |
| 5 | Strategist | `/pipeline-plan` | `04-implementation-plan.md` |
| 6 | Builder | `/pipeline-build` | Code + Git commits |
| 7 | Wallet | `/pipeline-wallet` | `05-wallet-config.md` |
| 8 | Tester | `/pipeline-test` | `06-test-results.md` |

## Implementation Options

At Phase 4, choose your implementation approach:

| Option | Approach | Description | Complexity |
|--------|----------|-------------|------------|
| A | Direct NWC | Backend-only, full control over UI | Medium |
| B | Bitcoin Connect | Pre-built modal, minimal code | Low |
| D | Hybrid | Combines A + B for flexibility | High |

## Directory Structure

```
.pipeline/
├── README.md                    # This file
├── 01-site-analysis.md          # Scout output
├── 02-architecture-map.md       # Architect output
├── 03-payment-options.md        # Researcher output
├── 04-implementation-plan.md    # Strategist output
├── 05-wallet-config.md          # Wallet output
├── 06-test-results.md           # Tester output
├── start-prompt.md              # Original prompt that started the pipeline
├── costs.md                     # LLM cost analysis
└── agents/                      # Agent definitions (English)
    ├── README.md                # Agents overview
    ├── scout/                   # Phase 1 agent
    ├── architect/               # Phase 2 agent
    ├── researcher/              # Phase 3 agent
    ├── strategist/              # Phase 5 agent
    ├── builder/                 # Phase 6 agent
    ├── wallet/                  # Phase 7 agent
    ├── tester/                  # Phase 8 agent
    └── orchestrator/            # Pipeline coordinator
```

## Agents

See [agents/README.md](agents/README.md) for detailed documentation of each agent including:
- Role and responsibilities
- Input/output specifications
- Command reference
- Behavior guidelines

## Wallet Configuration

After implementation, configure your NWC wallet:

1. Get NWC connection string from [Alby](https://getalby.com) or Alby Hub
2. **Use isolated connections** for security
3. Add to `.env.local`:
   ```env
   NWC_URL=nostr+walletconnect://...
   ```
4. Test at `/pipeline-test`

## Testing

The pipeline creates a test page at `/pipeline-test` that allows:
- Creating test invoices (1 sat)
- Verifying NWC connection
- Testing payment flow in isolation

## Requirements

- Node.js 18+
- Next.js project
- NWC-compatible wallet (Alby recommended)

## Generated Files

The pipeline produces these documentation files:

1. **01-site-analysis.md** - Project structure analysis
2. **02-architecture-map.md** - Integration architecture
3. **03-payment-options.md** - Payment method comparison
4. **04-implementation-plan.md** - Step-by-step plan
5. **05-wallet-config.md** - Wallet setup guide
6. **06-test-results.md** - Test verification results

## Security Notes

- Always use **isolated** NWC connections
- Store connection strings in `.env.local` (never commit)
- Use minimal permissions (`make_invoice`, `lookup_invoice`)
- Set spending limits on connections
- Test with small amounts first

## Replication

To replicate this implementation in another project:

1. Copy the `agents/` folder to your project's `.pipeline/` directory
2. Run `/pipeline-run` to start the integration process
3. Follow the agent prompts and documentation

See [start-prompt.md](start-prompt.md) for the original prompt that initiated this pipeline.
