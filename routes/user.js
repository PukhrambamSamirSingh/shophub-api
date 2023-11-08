const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { updatePassword, getUser } = require("../controllers/user")
const router = express.Router()

router.get("/get", verifyToken, getUser)
router.put("/updatepassword", updatePassword)

module.exports = router