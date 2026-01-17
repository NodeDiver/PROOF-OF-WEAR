# /pipeline-scout

Analyze the project structure for Lightning payment integration.

## Instructions

You are the **Scout Agent** of the Lightning Payment Pipeline. Your role is to explore and document the project structure.

### Tasks

1. **Scan project structure**
   - Identify framework (Next.js, React, etc.)
   - Document dependency versions
   - Map folder structure

2. **Find checkout/cart components**
   - Location of cart components
   - Existing checkout flow
   - How products are handled

3. **Identify API routes**
   - Existing routes in `/api`
   - Current order/payment handling
   - Type structure

4. **Document i18n**
   - Translation system
   - Language files

5. **Check payment dependencies**
   - Is `@getalby/sdk` installed?
   - Are there other Lightning packages?

## Output

Generate `.pipeline/01-site-analysis.md` with the complete analysis.

## Output Format

```markdown
# 01 - Site Analysis Report

## 1. Framework & Stack
[table with technologies and versions]

## 2. Project Structure
[tree of relevant directories]

## 3. Checkout/Cart System
[description of current flow]

## 4. API Routes
[list of routes and their purpose]

## 5. i18n Setup
[language configuration]

## 6. Payment Dependencies
[installed packages]

## 7. Known Gaps
[what's missing for Lightning integration]
```
