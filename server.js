const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, "db.json");

// Load or create DB
let db = {};
if (fs.existsSync(DB_PATH)) {
  db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

// Save helper
const saveDB = () => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
};

// Get student progress
app.get("/students/:slug", (req, res) => {
  const slug = req.params.slug;
  res.json(db[slug] || {});
});

// Save student progress
app.post("/students/:slug", (req, res) => {
  const slug = req.params.slug;
  db[slug] = req.body;
  saveDB();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
