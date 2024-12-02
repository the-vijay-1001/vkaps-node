import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

})

export const Product = mongoose.model("product", productSchema);