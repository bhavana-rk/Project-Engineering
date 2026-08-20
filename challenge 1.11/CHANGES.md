# Refactor Changes

## Variable Renames

| Old Name      | New Name                                         | Why                                                                                                                                                              |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app` (`var`) | `app` (`const`)                                  | The Express application reference is never reassigned, so `const` communicates that it is stable.                                                                |
| `confessions` | `confessions` in `services/confessionService.js` | Kept the domain collection name but moved it behind a service boundary so storage is no longer global in the server entry point.                                 |
| `x`           | `nextConfessionId`                               | Makes clear that the value is the next numeric confession identifier.                                                                                            |
| `t`           | removed                                          | The operation command existed only because one function handled every endpoint; named controller functions remove the need for an ambiguous dispatcher argument. |
| `d`           | `confessionData`                                 | Describes that the value is the submitted confession object.                                                                                                     |
| `r`           | `req.params`                                     | The controller now reads route parameters directly, so an alias adds no meaning.                                                                                 |
| `tmp`         | `confession`                                     | Describes the domain object being created.                                                                                                                       |
| `i`           | `confessionId`                                   | Identifies the parsed route identifier.                                                                                                                          |
| `arr`         | `data`                                           | Describes the list returned by the collection service.                                                                                                           |
| `result`      | inline response object                           | The response is now built at the controller boundary where its HTTP shape belongs.                                                                               |
| `cat`         | `req.params.cat`                                 | The category is read directly at the route boundary instead of through a vague alias.                                                                            |
| `cats`        | `allowedCategories`                              | Describes the purpose of the category list and centralizes it in configuration.                                                                                  |
| `stuff`       | `categoryConfessions` (conceptually)             | The category service now returns a named domain collection rather than an ambiguous value.                                                                       |
| `res2`        | removed                                          | The delete service returns the removed `confession` directly instead of exposing an array from `splice`.                                                         |
| `handler`     | `confessionIndex`                                | Identifies that the number is an index into the confession collection.                                                                                           |
| `fn`          | `confession`                                     | Makes the callback value's domain meaning explicit.                                                                                                              |

## Function Splits

### `handleAll()` split into:

- `validateConfessionInput()` - validates required fields and category values before storage.
- `saveConfession()` - creates the confession record and performs the single in-memory write.
- `formatConfessionResponse()` - shapes the created confession response at the service boundary.
- `listConfessions()` - returns all confessions in newest-first order.
- `findConfessionById()` - finds one confession by its route identifier.
- `listConfessionsByCategory()` - returns newest-first results for one category.
- `removeConfessionById()` - performs the single in-memory delete operation.
- `createConfession()` - controller orchestration for validation, persistence, and HTTP response status.
- `getAllConfessions()` - controller for the collection response.
- `getConfession()` - controller for the single-confession response.
- `getConfessionsByCategory()` - controller for category validation and response.
- `deleteConfession()` - controller for authorization, deletion, and response.

Why: the original function had five endpoint responsibilities mixed into one command-driven branch. The refactor makes routes declarative, controllers HTTP-focused, and services independently testable.

## Structure Decisions

- `routes/` contains endpoint declarations and delegates immediately.
- `controllers/` translates request data and service results into the existing HTTP responses.
- `services/` owns validation and in-memory confession operations.
- `config/env.js` centralizes the port, delete token, and allowed categories.
- `app.js` composes the Express application and starts the server only when run directly, which also makes it importable for endpoint tests.
