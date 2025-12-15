const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ---------------- VERIFY WEBHOOK ----------------
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "infrabyte_webhook_token";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// ---------------- RECEIVE MESSAGES ----------------
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming webhook:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
});

