# Lightning Payment Pipeline Agents

This directory contains the agent definitions and commands for the Lightning Payment Pipeline - a multi-agent system designed to integrate Bitcoin Lightning payments into any e-commerce project.

## Overview

The pipeline uses 8 specialized agents, each responsible for a specific phase of the integration process. The agents work sequentially, with each phase building upon the output of the previous one.

## Pipeline Flow

```
Phase 1: Scout        → Analyze project structure
Phase 2: Architect    → Map integration points
Phase 3: Researcher   → Evaluate payment options
Phase 4: (Human)      → Select implementation approach
Phase 5: Strategist   → Create implementation plan
Phase 6: Builder      → Implement code with commits
Phase 7: Wallet       → Configure NWC wallet
Phase 8: Tester       → Verify implementation
```

## Agents

| Agent | Phase | Command | Output |
|-------|-------|---------|--------|
| Scout | 1 | `/pipeline-scout` | `01-site-analysis.md` |
| Architect | 2 | `/pipeline-architect` | `02-architecture-map.md` |
| Researcher | 3 | `/pipeline-research` | `03-payment-options.md` |
| Strategist | 5 | `/pipeline-plan` | `04-implementation-plan.md` |
| Builder | 6 | `/pipeline-build` | Code + Git commits |
| Wallet | 7 | `/pipeline-wallet` | `05-wallet-config.md` |
| Tester | 8 | `/pipeline-test` | `06-test-results.md` |
| Orchestrator | All | `/pipeline-run` | Coordinates all phases |

## Agent Responsibilities

### Scout
Explores the codebase to understand the project structure, framework, existing checkout flow, and API routes.

### Architect
Maps the data flow from product selection to payment completion, identifying files to modify and create.

### Researcher
Analyzes NWC (Nostr Wallet Connect) implementation options and provides recommendations based on project requirements.

### Strategist
Creates a detailed step-by-step implementation plan including dependencies, types, API routes, and components.

### Builder
Executes the implementation plan, writing code and creating atomic git commits for each logical step.

### Wallet
Guides the configuration of NWC wallet connections, explaining security best practices like isolated connections.

### Tester
Verifies the implementation through manual and automated tests, documenting results and issues found.

### Orchestrator
Coordinates all agents, managing the pipeline flow and ensuring each phase completes successfully before proceeding.

## Directory Structure

```
agents/
├── README.md                    # This file
├── scout/
│   ├── scout.md                 # Agent definition
│   └── commands/
│       └── pipeline-scout.md    # Slash command
├── architect/
│   ├── architect.md
│   └── commands/
│       └── pipeline-architect.md
├── researcher/
│   ├── researcher.md
│   └── commands/
│       └── pipeline-research.md
├── strategist/
│   ├── strategist.md
│   └── commands/
│       └── pipeline-plan.md
├── builder/
│   ├── builder.md
│   └── commands/
│       └── pipeline-build.md
├── wallet/
│   ├── wallet.md
│   └── commands/
│       └── pipeline-wallet.md
├── tester/
│   ├── tester.md
│   └── commands/
│       └── pipeline-test.md
└── orchestrator/
    ├── orchestrator.md
    └── commands/
        └── pipeline-run.md
```

## Usage

### Run Full Pipeline
```
/pipeline-run
```

### Run Individual Phases
```
/pipeline-scout      # Phase 1
/pipeline-architect  # Phase 2
/pipeline-research   # Phase 3
/pipeline-plan       # Phase 5
/pipeline-build      # Phase 6
/pipeline-wallet     # Phase 7
/pipeline-test       # Phase 8
```

## Implementation Options

At Phase 4, the user chooses from these implementation approaches:

| Option | Description | Complexity |
|--------|-------------|------------|
| A | Direct NWC - Backend only, full control | Medium |
| B | Bitcoin Connect - Pre-built UI modal | Low |
| D | Hybrid - Combines A and B approaches | High |

## Output Files

All pipeline documentation is generated in the `.pipeline/` folder:

```
.pipeline/
├── 01-site-analysis.md      # Scout output
├── 02-architecture-map.md   # Architect output
├── 03-payment-options.md    # Researcher output
├── 04-implementation-plan.md # Strategist output
├── 05-wallet-config.md      # Wallet output
└── 06-test-results.md       # Tester output
```
