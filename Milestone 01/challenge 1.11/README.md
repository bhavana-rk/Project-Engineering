# Dev Confessions

An anonymous confession app for developers to share their bugs, deadline stress, imposter syndrome, and vibe-coding sessions.

## Endpoints

- GET /api/v1/confessions
- POST /api/v1/confessions
- GET /api/v1/confessions/:id
- GET /api/v1/confessions/category/:cat
- DELETE /api/v1/confessions/:id

## Run with:

npm install && npm start

The server reads `PORT` and `DELETE_TOKEN` from the environment. Copy
`.env.example` to `.env` for local development, then replace the placeholder
delete token. The default port remains `3000` for compatibility.

## Refactored Structure

- `routes/confessionRoutes.js` declares endpoints and delegates immediately.
- `controllers/confessionController.js` handles HTTP input, status codes, and responses.
- `services/confessionService.js` owns validation and in-memory confession operations.
- `config/env.js` centralizes runtime configuration and allowed categories.
- `app.js` composes the application and starts the server.

Read the complete [pre-refactor audit](./AUDIT.md) and [change log](./CHANGES.md)
for the decisions behind each move.

## Verification

Run `npm install` and `npm start`, then verify all five documented endpoints:

- `GET /api/v1/confessions`
- `POST /api/v1/confessions`
- `GET /api/v1/confessions/:id`
- `GET /api/v1/confessions/category/:cat`
- `DELETE /api/v1/confessions/:id`

## Live Deployment

Pending deployment. Add the public Render or Railway URL here after deployment.
