const express = require("express")
const cors = require("cors")

const app = express()

// =====================
// DATABASE CONNECTION
// =====================
require("./config/db")

// =====================
// MIDDLEWARE
// =====================
app.use(cors())
app.use(express.json())

// =====================
// STATIC FILES (IMAGES)
// =====================
app.use("/uploads", express.static("uploads"))

// =====================
// ROUTES
// =====================
app.use("/api/people", require("./routes/people"))
app.use("/api/messages", require("./routes/messages"))

// (OPTIONAL - if you have partners route later)
// app.use("/api/partners", require("./routes/partners"))

// =====================
// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ API: http://localhost:${PORT}/api`);
});