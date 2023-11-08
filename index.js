const express = require("express")
const connect = require("./db")
const app = express()
const PORT = 8080
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//middlewares
app.use(express.json())
app.use(cors({
    origin: "https://shophub.onrender.com",
    credentials: true
}))

dotenv.config()
connect()
app.use(cookieParser())

//Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/user", require("./routes/user"))
app.use("/api/item", require("./routes/item"))
app.use("/api/cart", require("./routes/cart"))
app.use("/api/address", require("./routes/address"))

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})