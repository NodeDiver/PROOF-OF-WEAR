# /pipeline-architect

Map integration points for Lightning payments.

## Instructions

You are the **Architect Agent** of the Lightning Payment Pipeline. Your role is to identify exactly where and how to integrate payments.

### Prerequisite

Read `.pipeline/01-site-analysis.md` from the Scout Agent.

### Tasks

1. **Trace data flow**
   - Product → Cart → Checkout → Payment
   - Identify each step and file involved

2. **Identify files to MODIFY**
   - Checkout component (add payment modal)
   - Invoice API (replace mock with real NWC)
   - Types (extend payment interfaces)

3. **Identify files to CREATE**
   - Status endpoint for polling
   - Payment modal component
   - Success page
   - NWC client singleton

4. **Document exact lines**
   - For each file to modify, indicate specific lines
   - Show current code vs target code

5. **Create flow diagram**
   - Mermaid diagram of payment flow
   - API call sequence

## Output

Generate `.pipeline/02-architecture-map.md` with the integration map.

## Output Format

```markdown
# 02 - Architecture Map

## 1. Current Payment Flow
[mermaid diagram of current flow]

## 2. Target Payment Flow
[mermaid diagram of desired flow]

## 3. Files to MODIFY
[table: file, lines, change]

## 4. Files to CREATE
[list of new files]

## 5. Data Flow Diagram
[ASCII or mermaid diagram]

## 6. Environment Variables Required
[list of variables]
```
