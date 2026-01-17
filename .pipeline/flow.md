# Lightning Payment Pipeline - Orchestration Flow

This document explains the multi-agent orchestration flow that transforms a basic e-commerce website into a fully functional shop with Bitcoin Lightning payments via NWC (Nostr Wallet Connect).

## Overview

```mermaid
flowchart TB
    subgraph Input
        A[Original Website<br/>github.com/NodeDiver/PROOF-OF-WEAR/tree/main]
    end

    subgraph Pipeline["Lightning Payment Pipeline"]
        O[Orchestrator]
        O --> P1[Phase 1: Scout]
        P1 --> P2[Phase 2: Architect]
        P2 --> P3[Phase 3: Researcher]
        P3 --> P4[Phase 4: Human Decision]
        P4 --> P5[Phase 5: Strategist]
        P5 --> P6[Phase 6: Builder]
        P6 --> P7[Phase 7: Wallet]
        P7 --> P8[Phase 8: Tester]
    end

    subgraph Output
        B[Functional Shop<br/>github.com/NodeDiver/PROOF-OF-WEAR/tree/01_nwc-custom]
    end

    Input --> Pipeline
    Pipeline --> Output
```

## Agent Flow Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant O as Orchestrator
    participant S as Scout
    participant A as Architect
    participant R as Researcher
    participant St as Strategist
    participant B as Builder
    participant W as Wallet
    participant T as Tester

    U->>O: /pipeline-run
    activate O

    Note over O: Initialize .pipeline/ folder

    O->>S: Execute Phase 1
    activate S
    S-->>S: Scan project structure
    S-->>S: Find checkout/cart components
    S-->>S: Map API routes
    S->>O: 01-site-analysis.md
    deactivate S

    O->>A: Execute Phase 2
    activate A
    A-->>A: Read Scout output
    A-->>A: Trace data flow
    A-->>A: Identify integration points
    A-->>A: Create Mermaid diagrams
    A->>O: 02-architecture-map.md
    deactivate A

    O->>R: Execute Phase 3
    activate R
    R-->>R: Read Architect output
    R-->>R: Research Alby ecosystem
    R-->>R: Analyze NWC protocol
    R-->>R: Compare options A/B/C/D
    R->>O: 03-payment-options.md
    deactivate R

    O->>U: Present options (A/B/D)
    U->>O: Select Option B (Bitcoin Connect)

    O->>St: Execute Phase 5
    activate St
    St-->>St: Read selected option
    St-->>St: Plan dependencies
    St-->>St: Design API routes
    St-->>St: Plan commit sequence
    St->>O: 04-implementation-plan.md
    deactivate St

    O->>B: Execute Phase 6
    activate B
    B-->>B: Read implementation plan
    loop For each step
        B-->>B: Write code
        B-->>B: Verify build
        B-->>B: Git commit
    end
    B->>O: Code implemented
    deactivate B

    O->>W: Execute Phase 7
    activate W
    W-->>W: Verify .env templates
    W->>U: Guide wallet setup
    U->>W: Configure NWC_URL
    W->>O: 05-wallet-config.md
    deactivate W

    O->>T: Execute Phase 8
    activate T
    T-->>T: Run build verification
    T-->>T: Test invoice creation
    T-->>T: Test payment flow
    T->>O: 06-test-results.md
    deactivate T

    O->>U: Pipeline complete!
    deactivate O
```

## Phase Details

### Phase 1: Scout Agent

```mermaid
flowchart LR
    subgraph Input
        I1[Project Codebase]
    end

    subgraph Scout["Scout Agent Tasks"]
        S1[Scan Structure]
        S2[Find Components]
        S3[Map Routes]
        S4[Check Dependencies]
        S5[Document Gaps]
    end

    subgraph Output
        O1[01-site-analysis.md]
    end

    I1 --> S1 --> S2 --> S3 --> S4 --> S5 --> O1
```

**Analyzes:**
- Framework (Next.js 15, React 19)
- Project structure
- Checkout/cart components
- API routes
- i18n configuration
- Existing payment dependencies

### Phase 2: Architect Agent

```mermaid
flowchart LR
    subgraph Input
        I1[01-site-analysis.md]
    end

    subgraph Architect["Architect Agent Tasks"]
        A1[Trace Data Flow]
        A2[Map Integration Points]
        A3[Identify Files to Modify]
        A4[Identify Files to Create]
        A5[Create Diagrams]
    end

    subgraph Output
        O1[02-architecture-map.md]
    end

    I1 --> A1 --> A2 --> A3 --> A4 --> A5 --> O1
```

**Produces:**
- Current vs Target flow diagrams
- Files to MODIFY with line numbers
- Files to CREATE list
- Environment variables needed

### Phase 3: Researcher Agent

```mermaid
flowchart TB
    subgraph Input
        I1[02-architecture-map.md]
    end

    subgraph Research["Researcher Agent Analysis"]
        R1[Alby SDK]
        R2[Bitcoin Connect]
        R3[Lightning Tools]
        R4[NWC Protocol]
    end

    subgraph Options["Implementation Options"]
        O1[A: Direct NWC<br/>Backend only]
        O2[B: Bitcoin Connect<br/>Pre-built UI]
        O3[C: WebLN<br/>Browser wallets]
        O4[D: Hybrid<br/>A + B combined]
    end

    subgraph Output
        OUT[03-payment-options.md]
    end

    I1 --> Research
    Research --> Options
    Options --> OUT
```

### Phase 4: Human Decision Point

```mermaid
flowchart TB
    subgraph Decision["User Chooses Implementation"]
        Q1{Which approach?}
        Q1 -->|Full control| A[Option A: Direct NWC]
        Q1 -->|Quick setup| B[Option B: Bitcoin Connect]
        Q1 -->|Maximum flexibility| D[Option D: Hybrid]
    end

    A --> P5
    B --> P5
    D --> P5

    P5[Phase 5: Strategist]
```

### Phase 5: Strategist Agent

```mermaid
flowchart LR
    subgraph Input
        I1[03-payment-options.md]
        I2[User Selection]
    end

    subgraph Plan["Strategist Creates Plan"]
        P1[Dependencies]
        P2[Type Definitions]
        P3[API Routes]
        P4[Components]
        P5[Integration]
        P6[Commit Sequence]
    end

    subgraph Output
        O1[04-implementation-plan.md]
    end

    I1 --> Plan
    I2 --> Plan
    Plan --> O1
```

### Phase 6: Builder Agent

```mermaid
flowchart TB
    subgraph Input
        I1[04-implementation-plan.md]
    end

    subgraph Build["Builder Executes Plan"]
        B1[Install Dependencies]
        B2[Add NWC Client]
        B3[Extend Types]
        B4[Create API Routes]
        B5[Add Provider]
        B6[Create Components]
        B7[Integrate Checkout]
        B8[Add Translations]
        B9[Add Test Page]
    end

    subgraph Output
        O1[Code + Commits]
    end

    I1 --> B1
    B1 -->|commit| B2
    B2 -->|commit| B3
    B3 -->|commit| B4
    B4 -->|commit| B5
    B5 -->|commit| B6
    B6 -->|commit| B7
    B7 -->|commit| B8
    B8 -->|commit| B9
    B9 --> O1
```

### Phase 7: Wallet Agent

```mermaid
flowchart TB
    subgraph Setup["Wallet Configuration"]
        W1[Verify .env templates]
        W2{Choose wallet type}
        W2 -->|Custodial| W3[Alby Account]
        W2 -->|Self-custodial| W4[Alby Hub]
        W3 --> W5[Create isolated connection]
        W4 --> W5
        W5 --> W6[Configure NWC_URL]
        W6 --> W7[Verify connection]
    end

    subgraph Output
        O1[05-wallet-config.md]
    end

    W7 --> O1
```

### Phase 8: Tester Agent

```mermaid
flowchart TB
    subgraph Tests["Test Suite"]
        T1[Build Verification]
        T2[Invoice Creation]
        T3[Payment Flow]
        T4[Bitcoin Connect]
    end

    subgraph Results
        T1 -->|pass/fail| R1[Build Status]
        T2 -->|pass/fail| R2[API Status]
        T3 -->|pass/fail| R3[E2E Status]
        T4 -->|pass/fail| R4[UI Status]
    end

    subgraph Output
        O1[06-test-results.md]
    end

    Results --> O1
```

## Data Flow: Product to Payment

```mermaid
flowchart LR
    subgraph Frontend
        P[Product] --> C[Cart]
        C --> CH[Checkout Form]
        CH --> PM[Payment Modal]
        PM --> QR[QR Code Display]
    end

    subgraph Backend
        API1[POST /api/orders]
        API2[POST /api/invoices]
        API3[GET /api/invoices/status]
    end

    subgraph NWC["NWC (Nostr Wallet Connect)"]
        NWC1[makeInvoice]
        NWC2[lookupInvoice]
    end

    subgraph Wallet["Lightning Wallet"]
        W[User's Wallet]
    end

    CH -->|create order| API1
    API1 -->|order created| API2
    API2 -->|call| NWC1
    NWC1 -->|invoice| PM
    PM -->|poll| API3
    API3 -->|check| NWC2
    W -->|pay invoice| NWC2
    NWC2 -->|paid| API3
    API3 -->|confirmed| PM
    PM -->|redirect| Success[Success Page]
```

## File Generation Timeline

```mermaid
gantt
    title Pipeline Execution Timeline
    dateFormat X
    axisFormat %s

    section Phase 1
    Scout Analysis           :p1, 0, 1
    01-site-analysis.md      :milestone, m1, after p1, 0

    section Phase 2
    Architecture Mapping     :p2, after m1, 1
    02-architecture-map.md   :milestone, m2, after p2, 0

    section Phase 3
    Options Research         :p3, after m2, 1
    03-payment-options.md    :milestone, m3, after p3, 0

    section Phase 4
    Human Decision           :p4, after m3, 0.5

    section Phase 5
    Implementation Planning  :p5, after p4, 1
    04-implementation-plan.md :milestone, m5, after p5, 0

    section Phase 6
    Code Implementation      :p6, after m5, 3
    Git Commits              :milestone, m6, after p6, 0

    section Phase 7
    Wallet Configuration     :p7, after m6, 1
    05-wallet-config.md      :milestone, m7, after p7, 0

    section Phase 8
    Testing                  :p8, after m7, 1
    06-test-results.md       :milestone, m8, after p8, 0
```

## Repository Transformation

```mermaid
flowchart TB
    subgraph Before["main branch"]
        B1[Static Product Display]
        B2[Mock Checkout]
        B3[No Real Payments]
    end

    subgraph Pipeline["Pipeline Execution"]
        P[8 Phases<br/>6 Documents<br/>11+ Commits]
    end

    subgraph After["01_nwc-custom branch"]
        A1[Full E-commerce Flow]
        A2[Real Lightning Invoices]
        A3[NWC Integration]
        A4[Bitcoin Connect UI]
        A5[Payment Verification]
        A6[Test Page]
    end

    Before --> Pipeline --> After
```

## Summary

The Lightning Payment Pipeline transforms any Next.js e-commerce project into a Bitcoin Lightning-enabled shop through:

1. **Automated Analysis** - Scout and Architect agents understand your codebase
2. **Informed Decisions** - Researcher presents options with trade-offs
3. **Human Control** - You choose the implementation approach
4. **Systematic Implementation** - Builder follows atomic commits
5. **Security Focus** - Wallet agent emphasizes isolated connections
6. **Verified Results** - Tester confirms everything works

**Source Repository:** https://github.com/NodeDiver/PROOF-OF-WEAR/tree/main
**Result Repository:** https://github.com/NodeDiver/PROOF-OF-WEAR/tree/01_nwc-custom
