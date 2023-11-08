const mongoose = require("mongoose")
const { Schema } = mongoose

const ItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    images: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: [Number]
    },
    price: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("Item", ItemSchema)