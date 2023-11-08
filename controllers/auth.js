const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
        return res.status(401).json("Email already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(req.body.password, salt)
    try {
        const newUser = await User.create({
            ...req.body,
            password: hashPwd
        })
        const data = {
            id: newUser._id,
            isAdmin: newUser.isAdmin
        }
        const { password, ...other } = newUser._doc
        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json(other)
    } catch (error) {
        res.status(500).json({ error: "Error in creating user" })
    }
}

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({ error: "Enter valid credentials" })
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(401).json({ error: "Enter valid credentials" })
    }
    const { password, ...detail } = user._doc
    const data = {
        id: user._id,
        isAdmin: user.isAdmin
    }
    const token = jwt.sign(data, process.env.JWT_SECRET)
    try {
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json(detail)
    } catch (error) {
        res.status(500).json({ error: "Error in logging user" })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json("Successfully logged out")
    } catch (error) {
        res.status(500).json({ error: "Error in logging out" })
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}