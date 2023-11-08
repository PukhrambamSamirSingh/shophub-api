const mongoose = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB successfully")
    } catch (error) {
        console.log("Failed to connect to DB", error)
    }
}

module.exports = connect