# Vibe vs. Pair Challenge

This challenge involves building the same Task Manager application twice to compare two distinct AI-assisted development workflows: **Vibe Coding** (using generative UI/app tools) and **AI Pair Programming** (using editor-integrated assistants). By the end, you'll have a clear understanding of the strengths and weaknesses of each approach.

## The App You Are Building

You will be building a standalone Task Manager. You must strictly follow the requirements outlined in the [app-spec.md](./app-spec.md) file for both versions.

## Your Folders

- `/vibe-version`: Use this folder for the version built using a "vibe" tool (e.g., Lovable, v0, Google AI Studio Build).
- `/pair-version`: Use this folder for the version built using an AI pair programming assistant (e.g., GitHub Copilot, Cursor).

## Live Deployments

- Vibe version: Pending hosting credentials
- Pair version: Pending hosting credentials

Both builds run locally as static sites from their respective folders. The supplied
GitHub repository URL currently returns `404 Not Found`, so publishing and adding
live URLs requires an accessible public repository or hosting account.

## Comparison Table

Fill out the following table after completing both versions:

| Dimension          | Vibe Version (tool used)                                                                                                            | Pair Version (tool used)                                                                                              | Verdict                                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Speed**          | Static build contains 3 files; no dependency install is needed. A timed external vibe-tool run was not available in this workspace. | Static build contains 3 files; no dependency install is needed. Implemented directly with Copilot assistance.         | Pair workflow is the only measured workflow here; external generation time remains unverified. |
| **Control**        | Separate HTML, CSS, and JS files provide the required behavior, but no vibe-tool prompt/export history is available to inspect.     | Explicit `matchesFilter`, `renderTasks`, and `updateTaskCount` functions make each requirement directly controllable. | Pair version has the better evidence for decision-level control.                               |
| **Code Quality**   | Uses DOM construction and `textContent` for task titles; browser smoke test passed add, complete, and Active filtering.             | Uses the same safe DOM construction approach; browser smoke test passed add, complete, and Completed filtering.       | Both are dependency-free and pass the same runtime contract.                                   |
| **Explainability** | `visibleTasks()` centralizes filter selection and `render()` updates the visible state in one place.                                | Filtering, rendering, and counting are split into three named functions.                                              | Pair version is easier to trace function by function.                                          |
| **Editability**    | Filter labels and page state are close together in one render path.                                                                 | Filter matching and count calculation are isolated, so changes can be made without changing DOM creation.             | Pair version has the more narrowly scoped edit points.                                         |

## When I Would Use Each Tool

**Vibe coding tool for:** a quick first-pass interface when the full generation/export workflow is available, because the output can establish a complete visual direction quickly.

**AI pair programming for:** behavior that needs to be reviewed or changed incrementally, because the pair version exposes separate filter, render, and count functions and was directly testable in the editor.

## Tools Used

- **Vibe tool used:** Not available in this workspace; the vibe folder is a static equivalent implementation pending a real Lovable, v0, or Google AI Studio export.
- **Pair tool used:** GitHub Copilot

## How to Submit

1. **PR Link:** Pending public repository access
2. **Video Link:** Pending recording and hosting access

## Local Verification

The two apps were served from `challenge 1.9` with Python's static server and
verified in a browser. Each version successfully added a task, toggled it complete,
filtered by status, and updated the remaining-task count. Tasks intentionally reset
on refresh, as required by `app-spec.md`.
