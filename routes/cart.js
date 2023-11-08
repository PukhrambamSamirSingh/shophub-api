const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const {
    addToCart,
    getCartItems,
    deleteItem,
    increaseQuantity,
    decreaseQuantity
} = require("../controllers/cart")
const router = express.Router()

router.post("/create/:itemId", verifyToken, addToCart)
router.get("/get", verifyToken, getCartItems)
router.delete("/delete/:id", deleteItem)
router.put("/increase/:id", increaseQuantity)
router.put("/decrease/:id", decreaseQuantity)

module.exports = router