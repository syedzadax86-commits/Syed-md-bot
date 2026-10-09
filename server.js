require("dotenv").config();

const express = require("express");
const os = require("os");
const path = require("path");
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const app = express();
app.use(express.json({ limit: "32kb" }));

const PORT = Number(process.env.PORT || 20048);
const SERVER_ID = process.env.SERVER_ID || "server-1";
const SERVER_NAME = process.env.SERVER_NAME || "Server 1";
const SERVER_API_KEY = process.env.SERVER_API_KEY || "";
const SERVER_PUBLIC_URL = (process.env.SERVER_PUBLIC_URL || "").replace(/\/+$/, "");
const CENTRAL_PAIRING_URL = (process.env.CENTRAL_PAIRING_URL || "https://niazi-md-bot.vercel.app").replace(/\/+$/, "");
const CENTRAL_REGISTRATION_SECRET = process.env.CENTRAL_REGISTRATION_SECRET || "";
const MAX_SESSIONS = Number(process.env.MAX_SESSIONS || 50);

const activeSockets = new Map();
const cachedCodes = new Map();

app.get("/", (_req, res) => {
  res.status(200).send("Syed MD pairing server is running. Use the central pairing website to request a code.");
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    id: SERVER_ID,
    name: SERVER_NAME,
    maxSessions: MAX_SESSIONS,
    pairingApi: true
  });
});

app.post("/api/pair", async (req, res) => {
  if (!SERVER_API_KEY || req.get("x-api-key") !== SERVER_API_KEY) {
    return res.status(401).json({ error: "Unauthorized pairing request" });
  }

  const phone = String(req.body && req.body.phone || "").replace(/\D/g, "");
  if (phone.length < 8 || phone.length > 15) {
    return res.status(400).json({ error: "Enter a valid WhatsApp phone number with country code" });
  }

  if (activeSockets.size >= MAX_SESSIONS && !activeSockets.has(phone)) {
    return res.status(503).json({ error: "This server has reached its configured session limit" });
  }

  try {
    const cached = cachedCodes.get(phone);
    if (cached && cached.expiresAt > Date.now()) {
      return res.status(200).json({ ok: true, code: cached.code, server: SERVER_NAME });
    }

    const authDir = path.join(os.tmpdir(), "syed-md-auth", phone);
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const socket = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: ["Syed MD", "Chrome", "120.0.0"]
    });

    socket.ev.on("creds.update", saveCreds);
    socket.ev.on("connection.update", ({ connection }) => {
      if (connection === "close") {
        // Keep the auth files for this process so a retry can resume pairing.
        activeSockets.delete(phone);
        cachedCodes.delete(phone);
      }
    });
    activeSockets.set(phone, socket);

    if (state.creds.registered) {
      return res.status(409).json({ error: "This number is already registered on this server. Remove its existing session before pairing again." });
    }

    const code = await socket.requestPairingCode(phone);
    cachedCodes.set(phone, { code, expiresAt: Date.now() + 3 * 60 * 1000 });
    return res.status(200).json({ ok: true, code, server: SERVER_NAME });
  } catch (error) {
    activeSockets.delete(phone);
    cachedCodes.delete(phone);
    console.error("Pairing request failed:", error && error.message ? error.message : "unknown error");
    return res.status(502).json({ error: "Could not generate a pairing code. Check this server's logs and configuration." });
  }
});

async function registerWithCentralSite() {
  if (!CENTRAL_PAIRING_URL || !CENTRAL_REGISTRATION_SECRET || !SERVER_API_KEY || !SERVER_PUBLIC_URL) {
    console.log("Central registration skipped: set CENTRAL_PAIRING_URL, CENTRAL_REGISTRATION_SECRET, SERVER_API_KEY, and SERVER_PUBLIC_URL.");
    return;
  }

  try {
    const response = await fetch(CENTRAL_PAIRING_URL + "/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-registration-secret": CENTRAL_REGISTRATION_SECRET
      },
      body: JSON.stringify({
        id: SERVER_ID,
        name: SERVER_NAME,
        url: SERVER_PUBLIC_URL,
        apiKey: SERVER_API_KEY,
        maxSessions: MAX_SESSIONS
      }),
      signal: AbortSignal.timeout(10000)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Central registration failed with status", response.status, data.error || "");
      return;
    }
    console.log("Registered with central pairing site:", SERVER_ID);
  } catch (error) {
    console.error("Central registration failed:", error && error.message ? error.message : "unknown error");
  }
}

app.listen(PORT, "0.0.0.0", () => {
  console.log("Syed MD pairing API listening on port", PORT);
  registerWithCentralSite();
  setInterval(registerWithCentralSite, 5 * 60 * 1000).unref();
});
