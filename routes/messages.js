const express = require("express")
const router = express.Router()
const db = require("../config/db")

// =====================
// SAVE MESSAGE
// =====================
router.post("/", (req, res) => {
  const { name, email, message } = req.body

  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)"

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Error saving message")
    }

    res.json({
      success: true,
      message: "Message saved successfully"
    })
  })
})

// =====================
// GET MESSAGES (ADMIN)
// =====================
router.get("/", (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC"

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Error fetching messages")
    }

    res.json(results)
  })
})

module.exports = router