const express = require("express")
const router = express.Router()
const db = require("../config/db")
const multer = require("multer")
const path = require("path")

// =======================
// IMAGE UPLOAD
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

// =======================
// GET ALL PEOPLE
// =======================
router.get("/", (req, res) => {
  db.query("SELECT * FROM people", (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// =======================
// ADD PERSON
// =======================
router.post("/", upload.single("image"), (req, res) => {
  const { name, role, email } = req.body
  const image = req.file ? req.file.filename : null

  db.query(
    "INSERT INTO people (name, role, email, image) VALUES (?, ?, ?, ?)",
    [name, role, email, image],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Person added successfully" })
    }
  )
})

// =======================
// DELETE PERSON
// =======================
router.delete("/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM people WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json({ message: "Deleted successfully" })
  })
})

module.exports = router