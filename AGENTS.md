<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AMAJO continuity

Read `docs/IMPLEMENTATION_PLAN.md` and `docs/PROJECT_STATUS.md` before changes. Follow the existing phase order and acceptance criteria. Preserve `stitch_amajo design/` as original reference material. Do not mark UI-only business features complete or imply backend/authentication exists before its scheduled implementation.

## Version control

GitHub repository: `https://github.com/db2910/Amajo.git`, remote `origin`. Before beginning Phase 2, commit and verify the Phase 1 push to `origin/main`. After each verified phase, review changes and staged files for secrets, update both progress documents, commit with a meaningful message, push and verify synchronization. Use feature branches and reviewed pull requests for substantial changes where practical. Never force-push or overwrite remote history; inspect and understand remote changes/conflicts before integrating them. Keep credentials out of commits, remote URLs and documentation.
