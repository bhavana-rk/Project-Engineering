# Pre-Refactor Audit

This audit was written after reading every file in `Milestone 01/challenge 1.11`: `app.js`, `package.json`, `.gitignore`, and `README.md`. The refactor will preserve the existing endpoint paths, response shapes, validation behavior, in-memory storage, delete token behavior, and default port.

## Findings

1. `app.js` owns Express setup, request routing, validation, in-memory storage, ID generation, sorting, filtering, deletion, logging, and server startup. These responsibilities should be separated.
2. `handleAll(req, res, t)` is a dispatcher with five unrelated branches (`create`, `getAll`, `getOne`, `getCat`, and `del`). It is difficult to test and any change in one branch risks affecting another.
3. Route declarations call `handleAll` with string commands instead of delegating to named controllers. The route layer therefore depends on an internal command protocol rather than expressing endpoint intent.
4. `var` is used for mutable and immutable values throughout the file. The code should use `const` by default and `let` only where reassignment is required.
5. Variable names are vague: `x` is the ID counter, `d` is the request body, `r` is route parameters, `t` is the operation name, `tmp` is a new confession, `i` is a parsed ID, `arr` is the sorted collection, `result` is the list response, `cat` is a category parameter, `cats` is the allowed category list, `stuff` is category results, `res2` is the removed confession array, and `handler` is a matching index.
6. The allowed categories are duplicated in the create and category branches. A single configuration constant should be the source of truth.
7. The delete token `supersecret123` is hardcoded in application logic. It should be read from `process.env.DELETE_TOKEN`, with a documented placeholder in `.env.example`.
8. The listening port `3000` is hardcoded. It should be read from `process.env.PORT` with `3000` as the compatibility-preserving default.
9. The delete authorization header name is embedded in the controller logic. It should be named in configuration so the security contract is visible and centralized.
10. Input validation is deeply nested inside the create branch. It should be a focused service function that returns a clear validation result while preserving the current status codes and messages.
11. Database-like storage operations are mixed directly into request handling. The in-memory repository behavior should be isolated in a service module so it can be replaced or tested independently.
12. Response formatting and HTTP status selection are mixed with validation and storage mutation. Controllers should translate service results into the existing HTTP responses.
13. `getAll` sorts the shared `confessions` array in place. The service should sort a copy so a read operation does not mutate repository ordering as an incidental side effect.
14. `getCat` uses a verbose callback filter and reverses the filtered result. A named service function can express the category query while preserving the original newest-first result order.
15. ID parsing is performed inline without a named helper. A controller/service boundary should make the conversion and lookup intent explicit.
16. Logging messages are embedded in endpoint branches and do not identify the layer or operation consistently. Logging should remain, but move beside the operation it describes.
17. The `if (confessions.length > 500)` check runs only at startup, so it cannot report a later collection size and has no effect on behavior. It is dead operational logic and should be removed or replaced with a meaningful runtime concern; this refactor removes it because the assignment requires no behavior change and it never affected responses.
18. The README documents the endpoints and startup command but does not explain the architecture, environment variables, or refactor decisions. It needs a deployment/configuration section and links to `AUDIT.md` and `CHANGES.md`.
19. There are no automated tests or documented endpoint examples. Verification must cover every existing endpoint after the refactor.
20. The project has no `.env.example`, so a new developer cannot discover required runtime configuration without reading source code.

## Compatibility Contract

The refactor must keep these externally observable behaviors:

- `POST /api/v1/confessions` accepts `text` and one of `bug`, `deadline`, `imposter`, or `vibe-code`; it returns `201` and the created confession.
- Missing or invalid text/category values retain the starter status codes and response messages.
- `GET /api/v1/confessions` returns `{ data, count }` sorted newest first.
- `GET /api/v1/confessions/:id` returns the confession or the existing `404` response.
- `GET /api/v1/confessions/category/:cat` returns matching confessions or the existing invalid-category response.
- `DELETE /api/v1/confessions/:id` requires the configured delete token and preserves the existing success and error response shapes.
- The server defaults to port `3000` when `PORT` is not supplied.
