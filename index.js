import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import db from "./models/db.js"
import userRoute from "./routes/user.route.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import productRoute from "./routes/product.route.js"
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/user", userRoute);
app.use("/", productRoute)

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log("server started on " + port)
});