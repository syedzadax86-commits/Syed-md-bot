# Syed zada X niazi MD Bot

## Central pairing website

The central pairing website is:

`https://niazi-md-bot.vercel.app`

This repository now includes a small HTTP pairing API in `server.js`. The Heroku app registers itself with the central website and exposes:

- `GET /api/health` — server health check
- `POST /api/pair` — generates a WhatsApp pairing code (requires the `x-api-key` header)

## Heroku Config Vars

Set these values in Heroku **Settings → Config Vars**:

- `CENTRAL_PAIRING_URL` = `https://niazi-md-bot.vercel.app`
- `CENTRAL_REGISTRATION_SECRET` = the same secret configured as `REGISTRATION_SECRET` in the Vercel pairing project
- `SERVER_PUBLIC_URL` = the full public HTTPS URL shown under this Heroku app's Settings → Domains
- `SERVER_ID` = a unique value such as `server-1`
- `SERVER_NAME` = a display name such as `Server 1`
- `SERVER_API_KEY` = a private key used to authenticate pairing requests
- `MAX_SESSIONS` = the session limit

Do not share `SERVER_API_KEY`, `CENTRAL_REGISTRATION_SECRET`, or database credentials publicly.

## Vercel pairing project Config Vars

In the Vercel project for the central pairing website, set:

- `MONGODB_URL` = MongoDB connection URI
- `DB_NAME` = `baga` (or the database name you intend to use)
- `REGISTRATION_SECRET` = the same private value as Heroku's `CENTRAL_REGISTRATION_SECRET`

After saving Vercel environment variables, redeploy the Vercel project. Redeploy the Heroku app after pushing code changes.

**Important:** This repository's current tracked files do not include the main WhatsApp bot entrypoint/message handler. The pairing API can request a pairing code, but full bot command handling still requires the actual bot runtime to be added and started.
