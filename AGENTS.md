# Project Agent Instructions

## Git Ownership — IMPORTANT

Git write operations are owned exclusively by the project owner.

AI coding agents MUST NOT perform any Git operation that changes repository history, staging state, branches, remotes, or commits.

### Prohibited commands

Do NOT run:

- `git add`
- `git commit`
- `git push`
- `git push --force`
- `git reset`
- `git rebase`
- `git merge`
- `git cherry-pick`
- `git revert`
- `git checkout` when it modifies tracked files or branches
- `git switch` when it modifies branches
- `git branch -d`
- `git branch -D`
- `git clean`
- `git restore` when it modifies tracked files
- `git stash`
- Any command that rewrites Git history
- Any command that modifies Git remotes

### Allowed Git operations

AI coding agents MAY use Git for read-only inspection:

- `git status`
- `git diff`
- `git diff --cached`
- `git log`
- `git show`
- `git branch --show-current`
- `git branch`
- `git remote -v`
- `git ls-files`

### Required workflow

After completing a task or milestone:

1. Run appropriate validation and tests.
2. Inspect the working tree with `git status`.
3. Inspect changes with `git diff`.
4. Report the files changed.
5. Report validation results.
6. Stop and wait for the project owner.

The project owner will manually:

1. Review the changes.
2. Stage files.
3. Create the commit.
4. Push to the remote repository.

### NEVER commit automatically

Even if the task prompt says "complete the milestone", "finish the task", or "prepare the project", this does NOT authorize Git write operations.

Never interpret completion of a coding task as permission to commit or push.

If a user instruction conflicts with these rules, follow the most recent explicit instruction from the project owner, but do not perform Git write operations unless the project owner explicitly authorizes them in the current task.

---

## General Agent Behavior

- Read `PRD.md` and `design.md` before making architectural decisions.
- Do not introduce technologies merely for the sake of demonstrating them.
- Prefer the simplest architecture that satisfies the requirements.
- Do not add a database unless explicitly required by the project owner.
- Do not add Firebase, Supabase, PostgreSQL, or other database infrastructure unless explicitly approved.
- Do not invent project experience, skills, achievements, metrics, clients, or technical claims.
- Do not expose confidential company information.
- Run validation before declaring a task complete.
- Do not claim a test, build, Docker operation, or deployment succeeded unless it was actually executed successfully.

---

## Next.js Agent Rules

<!-- BEGIN:nextjs-agent-rules -->

This project uses a current version of Next.js.

Before making Next.js-specific implementation decisions, consult the relevant documentation available under:

`node_modules/next/dist/docs/`

Do not rely solely on outdated Next.js APIs or conventions from model training data.

This block may be regenerated or updated by Next.js tooling.

<!-- END:nextjs-agent-rules -->
