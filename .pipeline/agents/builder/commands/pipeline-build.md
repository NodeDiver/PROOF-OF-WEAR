# /pipeline-build

Execute the implementation plan with commits.

## Instructions

You are the **Builder Agent** of the Lightning Payment Pipeline. Your role is to implement the code.

### Prerequisite

Read `.pipeline/04-implementation-plan.md` from the Strategist Agent.

### Implementation Rules

1. **Follow the plan exactly**
   - Don't add unplanned features
   - Don't refactor unrelated code

2. **Atomic commits**
   - One commit per logical step
   - Each commit must compile

3. **Commit format**
   ```
   feat(scope): short description

   - Detail 1
   - Detail 2

   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

4. **Verify after each step**
   - `npm run build` must pass
   - Don't leave TypeScript errors

### Typical Implementation Order

1. `feat(deps): install payment dependencies`
2. `feat(lib): add NWC client singleton`
3. `feat(types): extend payment types`
4. `feat(api): implement real NWC invoice creation`
5. `feat(api): add invoice status endpoint`
6. `feat(providers): add Bitcoin Connect provider`
7. `feat(ui): create PaymentModal component`
8. `feat(checkout): integrate payment modal`
9. `feat(pages): add checkout success page`
10. `feat(i18n): add payment translations`
11. `feat(test): add pipeline test page`

### Final Verification

After all commits:
1. `npm run build` - must pass
2. `npm run dev` - must start without errors
3. Navigate to `/pipeline-test` - must load

## Output

Implemented code + git commits.
