const express = require("express")
const { createUser, loginUser, logoutUser, google } = require("../controllers/auth")
const router = express.Router()

router.post("/create", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

module.exports = router