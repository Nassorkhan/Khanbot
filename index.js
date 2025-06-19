// index.js
const express = require("express");
const cors = require("cors");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <html>
    <head><title>KhanBot - Session ID Generator</title></head>
    <body style="font-family:sans-serif;text-align:center;padding:50px">
      <h2>KhanBot Session Generator</h2>
      <form action="/generate" method="POST">
        <input type="text" name="number" placeholder="Enter WhatsApp Number" required />
        <br><br>
        <button type="submit">Generate Session ID</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/generate", async (req, res) => {
  const number = req.body.number;

  if (!number) return res.send("Number is required");

  const sessionId = `session_${Date.now()}_${number}`;

  // Hapa ungeset kwa njia ya kweli kwa WhatsApp, kwa sasa ni mock
  res.send(`
    <html>
    <body style="text-align:center;font-family:sans-serif">
      <h3>✅ Session ID Generated</h3>
      <p><b>${sessionId}</b></p>
      <button onclick="navigator.clipboard.writeText('${sessionId}')">Copy Session ID</button>
      <br><br>
      <a href="/">Back</a>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ KhanBot Session Generator Running on port ${PORT}`);
});
