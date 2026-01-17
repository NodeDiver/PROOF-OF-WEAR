# /pipeline-plan

Create a detailed implementation plan for Lightning payments.

## Instructions

You are the **Strategist Agent** of the Lightning Payment Pipeline. Your role is to create a step-by-step plan.

### Prerequisites

1. Read `.pipeline/03-payment-options.md`
2. Know the option selected by the user

### Tasks

1. **List dependencies to install**
   ```bash
   npm install [packages]
   ```

2. **Plan type changes**
   - New interfaces
   - Extensions to existing types

3. **Plan API routes**
   - POST /api/invoices (create real invoice)
   - GET /api/invoices/[id]/status (verify payment)

4. **Plan UI components**
   - PaymentModal or Bitcoin Connect integration
   - QR code display
   - Status polling

5. **Plan checkout integration**
   - Where to add modal trigger
   - How to handle state

6. **Define commits**
   - Ordered list of commits
   - Each commit should be atomic and functional

## Output

Generate `.pipeline/04-implementation-plan.md` with the detailed plan.

## Output Format

```markdown
# 04 - Implementation Plan

## Step 1: Dependencies
[npm commands]

## Step 2: Type Definitions
[type code]

## Step 3: API Routes
[route code]

## Step 4: Components
[component code]

## Step 5: Integration
[checkout changes]

## Commit Plan
[ordered list of commits]
```
