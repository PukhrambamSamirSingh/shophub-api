const Cart = require("../models/Cart")
const Item = require("../models/Item")
const User = require("../models/User")

const addToCart = async (req, res) => {
    const userId = req.userId
    const itemId = req.params.itemId
    const item = await Item.findById(itemId)

    try {
        if (!item) {
            return res.status(401).json("Item not found")
        }
        const { size, color, price } = req.body
        const existingItem = await Cart.findOne({ userId, itemId, size, color, price })
        if (existingItem) {
            existingItem.quantity += 1
            await existingItem.save()
            res.status(200).json(existingItem)
        } else {
            const cartItem = await Cart.create({
                userId: userId,
                itemId: itemId,
                size: size,
                color: color,
                price: price
            })
            res.status(200).json(cartItem)
        }
    } catch (error) {
        res.status(500).json({ error: "Error in getting item" })
    }
}

const getCartItems = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        const cartItems = await Cart.find({ userId: user._id }).sort({ createdAt: -1 }).populate("itemId")
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(500).json({ error: "Error in getting cart items" })
    }
}

const increaseQuantity = async (req, res) => {
    try {
        const cartItem = await Cart.findById({ _id: req.params.id })
        if (!cartItem) {
            return res.status(401).json("Cart item not found")
        }
        cartItem.quantity += 1
        await cartItem.save()
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({ error: "Error in increasing quantity" })
    }
}

const decreaseQuantity = async (req, res) => {
    try {
        const cartItem = await Cart.findById({ _id: req.params.id })
        if (!cartItem) {
            return res.status(401).json("Cart item not found")
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1
            await cartItem.save()
            res.status(200).json(cartItem)
        } else {
            await cartItem.deleteOne(cartItem)
        }
    } catch (error) {
        res.status(500).json({ error: "Error in decreasing quantity" })
    }
}

const deleteItem = async (req, res) => {
    try {
        await Cart.deleteOne({ _id: req.params.id })
        res.status(200).json("Cart deleted successfully")
    } catch (error) {
        res.status(500).json({ error: "Error in deleting cart item" })
    }
}

module.exports = {
    addToCart,
    getCartItems,
    deleteItem,
    increaseQuantity,
    decreaseQuantity
}