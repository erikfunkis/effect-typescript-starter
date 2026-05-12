## Problem Statement

Teams building fullstack TypeScript products with Effect need a starter template that is immediately productive for coding agents and humans, but current starting points are inconsistent, overly framework-specific, or not aligned with Effect v4 beta conventions. The result is slow iteration loops, brittle setup, and drift between local workflows and CI.

## Solution

Deliver a Vite+ based, Effect-centered fullstack TypeScript starter template with a framework-agnostic frontend baseline, a minimal Effect backend, deterministic quality gates, Playwright fast-path E2E, required Effect LSP setup, and vendored `effect-smol` source context for coding agents. The template should be ready to clone and use with `vp` commands as the primary interface.

## User Stories

1. As a fullstack TypeScript engineer, I want a single starter template, so that I can begin new projects without rebuilding foundational tooling.
2. As a coding-agent user, I want deterministic command entrypoints, so that agent runs are consistent across environments.
3. As a developer used to npm, I want the repo to feel package-manager-agnostic at the command layer, so that I can use `vp` without workflow friction.
4. As a team lead, I want strict default quality gates, so that merges do not accumulate type/lint debt.
5. As a maintainer, I want Effect v4 beta versions pinned exactly, so that behavior is reproducible over time.
6. As a maintainer, I want a tested-versions matrix documented, so that upgrade risk is visible.
7. As a developer, I want a framework-agnostic web app baseline, so that core starter value is not tied to React/Vue decisions.
8. As a fullstack engineer, I want a minimal backend app included, so that I start from an actual end-to-end architecture.
9. As a developer, I want a `/health` endpoint out of the box, so that smoke checks and integration tests are straightforward.
10. As a frontend engineer, I want the web app to call backend health immediately, so that I can validate cross-app wiring from day one.
11. As a QA-focused engineer, I want Playwright configured by default, so that browser behavior is part of the standard loop.
12. As a fast-iteration team, I want Chromium-only E2E in default CI, so that feedback cycles stay short.
13. As a reliability engineer, I want optional multi-browser expansion paths documented, so that confidence can scale later.
14. As a developer, I want `vp check` to be the required pre-merge gate, so that formatting/lint/type validation is unified.
15. As a code-reviewer, I want lint warnings treated as failures, so that warning debt does not grow.
16. As a contributor, I want root scripts to provide obvious defaults (`dev`, `check`, `test`, `build`, `test:e2e`), so that onboarding is quick.
17. As a developer, I want CI order to fail fast, so that expensive stages run only after cheap checks pass.
18. As a new contributor, I want a README with exact setup steps, so that first-run success is likely.
19. As a team with coding agents, I want Effect source available in-repo, so that agents can inspect real patterns instead of guessing.
20. As a developer, I want vendored source to be read-only by policy, so that application code is not coupled to reference repos.
21. As an agent operator, I want clear guidance to consult vendored `effect-smol` first, so that generated code follows current beta idioms.
22. As a TypeScript user, I want strict compiler defaults aligned with Effect practice, so that issues surface early.
23. As an Effect user, I want language-service integration required, so that editor and type-check loops are faster and more accurate.
24. As a VS Code/Cursor user, I want workspace TypeScript usage documented, so that plugin behavior matches project config.
25. As a maintainer, I want `effect-language-service patch` included in lifecycle scripts, so that diagnostics are consistently enabled.
26. As a project owner, I want clear non-goals for v1, so that scope stays disciplined.
27. As a planner, I want explicit post-v1 expansion tracks, so that future enhancements do not destabilize the baseline.
28. As a CI maintainer, I want the local flow to mirror CI contracts, so that “works locally but fails in CI” cases are reduced.
29. As a team adopting Effect, I want backend examples based on `effect-smol` HTTP basics, so that starter code follows current canonical shape.
30. As a template consumer, I want the final artifact to be ready to clone and run, so that I can begin feature work immediately.

## Implementation Decisions

- The template is positioned explicitly as a Vite+ starter and uses `vp` as the canonical workflow interface.
- Repository structure is a monorepo with app boundaries (`web`, `api`) and shared/package boundaries (`shared`, `config`) to support clear separation of concerns.
- The frontend baseline remains framework-agnostic in v1 to preserve portability and avoid coupling core starter value to UI-library selection.
- A minimal backend is included in v1 (not deferred), using Effect v4 beta patterns and exposing at least one health endpoint for integration and smoke testing.
- End-to-end wiring is intentionally thin: web consumes API health status with no auth, database, or SSR concerns.
- Effect package versions are pinned to exact values to control beta volatility and preserve reproducibility.
- TypeScript compiler baseline follows `effect-smol` conventions with strictness-first defaults and minimal local overrides only when required by environment.
- Effect language service is a required part of the baseline developer experience, including plugin configuration and patching step.
- Linting policy is zero-warning from day one, with exceptions only by explicit and documented allowlist rationale.
- CI is ordered for fast failure: install, checks, tests, API smoke, then Playwright E2E.
- Playwright fast path defaults to Chromium only, with explicit optional expansion to Firefox/WebKit outside default merge path.
- Vendored external reference strategy uses `git subtree` under `repos/` and treats vendored code as read-only source context for agents.
- For Effect v4 beta drift management, vendored `repos/effect-smol` is treated as source-of-truth for idioms when docs and ecosystem examples diverge.
- Agent guidance is formalized to prioritize vendored patterns and to avoid importing runtime code from vendored directories.
- Documentation is treated as part of product completeness: README prerequisites, quick-start, tested versions matrix, quality gates, and CI-equivalent local flow are required deliverables.

## Testing Decisions

- Good tests validate externally observable behavior and contracts, not implementation details or internal wiring choices.
- Tests should prioritize confidence in developer workflows: commands, integration seams, and user-visible outcomes.
- Module test scope:
  - Template Core: verify scripts, workspace wiring, and command entrypoint behavior.
  - Effect Runtime Baseline: verify type-check/language-service integration paths and strict compiler behavior through representative samples.
  - API Starter: verify `/health` response contract and startup behavior.
  - Web Starter: verify health-call rendering flow and failure handling at UI boundary.
  - Quality Gates: verify `check`/`test`/E2E commands and CI ordering assumptions.
  - Agent Context System: verify documented policy presence and subtree/update workflow guidance.
- E2E baseline uses Playwright Chromium and asserts page load + API health integration.
- CI smoke includes direct health endpoint verification before browser E2E.
- Prior art for testing strategy comes from the established policy in the template spec: fail-fast CI contract, deterministic checks, and end-to-end health-path coverage.

## Out of Scope

- Authentication and authorization systems.
- Database integration and migrations.
- SSR or server components.
- Mandatory multi-browser E2E in default merge CI.
- Framework-specific frontend adapters in core v1 (React/Vue tracks are later expansions).
- Advanced backend production concerns (caching layers, queue systems, distributed tracing setup, etc.).
- Replacing Vite+ with alternate build/runtime toolchains.

## Further Notes

- This PRD fully incorporates the decisions and acceptance criteria in `TEMPLATE_SPEC.md`.
- “Done” for this PRD means the repository becomes a ready-to-use Vite+ TypeScript template centered on Effect v4 beta practices, including LSP-enabled fast iteration loops and vendored `effect-smol` context for coding agents.
- If issue-tracker publication is required, the PRD content can be posted verbatim with `ready-for-agent` labeling once tracker tooling/context is configured.
