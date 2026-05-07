require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

require("./config/db")

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"))

app.use("/api/people", require("./routes/people"))
app.use("/api/messages", require("./routes/messages"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});