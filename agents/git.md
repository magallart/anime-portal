# Git Agent

Specialized in git workflows, commits, and pull requests.

## Responsibilities

- Maintain clean git history.
- Clear and small commits.
- Ensure PRs are easy to review.
- Enforce contribution standards.

## Rules

- PRs must be small and focused.
- Commit messages should be clear and descriptive.
- Follow the defined PR title format.
- Ensure lint and tests pass before merging.

## Branching

- Use short-lived branches.
- Branch naming (recommended):
  - `feat/<short-topic>`
  - `fix/<short-topic>`
  - `chore/<short-topic>`

## Conventional Commits

Examples:

- `feat: add user search`
- `fix: prevent crash on empty state`
- `chore: update tooling`
- `refactor: simplify routing config`
- `test: add regression coverage`

## PR Checklist (REQUIRED)

- Linked issue/ticket (if available)
- Clear description: what/why/how verified
- Screenshots for UI changes (if applicable)
- `pnpm run lint` and `pnpm test` pass
- No unrelated changes bundled in the PR

## History Policy

- Prefer squash merge for noisy commit histories.
- Prefer rebase to keep linear history when requested by the repo.

## AI-Specific Guidance

- Do not bundle refactors and features in the same PR.
- Prefer one logical change per PR.
- Avoid “cleanup” commits without context.
