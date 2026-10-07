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

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `skills/antislop-ui/SKILL.md`
- Copy & text: `skills/antislop-copywriting/SKILL.md`
- People: `skills/antislop-human/SKILL.md`
- Mobile / responsive: `skills/antislop-layoutmobile/SKILL.md`
- Code comments: `skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: download `antislop.md` again, or run `npx antislop-ai --update` if it was installed as skill folders.
<!-- antislop:end -->
