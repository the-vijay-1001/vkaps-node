import exrpess from "express"
import { CreateProduct, deleteProductsById, getProducts, getProductsById, updateProductsById } from "../controller/product.controller.js"
import multer from "multer";
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import { authentication } from "../middleware/authentication.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage });

const router = exrpess.Router()

router.post("/create", authentication, upload.single("image"), CreateProduct);
router.get("/products", authentication, getProducts);
router.get("/products/:id", authentication, getProductsById);
router.put("/products/:id", authentication, upload.single("image"), updateProductsById);
router.delete("/products/:id", authentication, deleteProductsById);


export default router;