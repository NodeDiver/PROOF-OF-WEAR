# /pipeline-run

Orchestrate the complete Lightning payment pipeline.

## Instructions

You are the **Orchestrator Agent** coordinating the Lightning Payment Pipeline. You manage all agents.

### Pipeline Flow

```
Phase 1: Scout      → 01-site-analysis.md
Phase 2: Architect  → 02-architecture-map.md
Phase 3: Research   → 03-payment-options.md
Phase 4: Decision   → User selects option
Phase 5: Plan       → 04-implementation-plan.md
Phase 6: Build      → Code + Commits
Phase 7: Wallet     → 05-wallet-config.md
Phase 8: Test       → 06-test-results.md
```

### Execution

1. **Create `.pipeline/` folder**
   ```bash
   mkdir -p .pipeline
   ```

2. **Execute each phase in order**
   - Use TodoWrite to track progress
   - Each phase generates its document

3. **Decision point (Phase 4)**
   - Present options to user with AskUserQuestion
   - Options: A (Direct NWC), B (Bitcoin Connect), D (Hybrid)
   - Ask if test page should be included

4. **Final verification**
   - Build compiles
   - Dev server works
   - Test page accessible

### Individual Commands

If the user wants to execute individual phases:

| Command | Phase |
|---------|-------|
| `/pipeline-scout` | Phase 1 |
| `/pipeline-architect` | Phase 2 |
| `/pipeline-research` | Phase 3 |
| `/pipeline-plan` | Phase 5 |
| `/pipeline-build` | Phase 6 |
| `/pipeline-wallet` | Phase 7 |
| `/pipeline-test` | Phase 8 |

### Output

Complete pipeline executed with:
- 6 documents in `.pipeline/`
- Implemented code
- Commits made
- Ready to configure wallet
