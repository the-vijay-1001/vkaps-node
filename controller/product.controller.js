import { Product } from "../models/product.model.js"

export const CreateProduct = async (req, res) => {
    try {
        const { name, price, category, inStock } = req.body;
        if (name && price && category && inStock) {
            if (!req.file)
                return res.json({ message: "File is required..." })
            const product = await Product.create({ name, price, category, inStock, image: req.file.filename });
            if (product)
                return res.status(200).json({ message: "Product Created", data: product, status: true })
            return res.status(400).json({ message: "Something went wrong...", status: false })
        }
        else {
            return res.json({ message: "All Fields Required...", status: false })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length)
            return res.status(200).json({ message: "Products Found", total: products.length, data: products, status: true })
        return res.status(200).json({ message: "Something went wrong..", data: null, status: false })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById({ _id: id })
        if (products)
            return res.status(200).json({ message: "Products Found", total: products.length, data: products, status: true })
        return res.status(400).json({ message: "Something went wrong..", status: false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const updateProductsById = async (req, res) => {
    try {
        console.log("here")
        const { id } = req.params;
        const { name, category, inStock, price } = req.body;
        const products = await Product.findByIdAndUpdate(id, { name, category, inStock, price, image: req.file.filename }, { new: true });
        if (products)
            return res.status(200).json({ message: "Product Updated", total: products.length, data: products, status: true })
        return res.status(400).json({ message: "Something went wrong..", status: false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const deleteProductsById = async (req, res) => {
    try {
        console.log("yes inside this")
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete({ _id: id })
        if (deletedProduct)
            return res.status(200).json({ message: "Products Deleted", data: deletedProduct, status: true })
        return res.status(400).json({ message: "Something went wrong..", status: false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}