import express from "express";
import { LoginAdmin, adminOnly } from "../middleware/AuthAdmin.js";
import { authToken, verifyUser, decodeJWT } from "../middleware/AuthUser.js";
import {
    getProduct,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,

} from "../Controllers/ProductController.js";


const router = express.Router();
router.post('/admin', LoginAdmin);
router.get('/accessToken', decodeJWT);

router.get('/admin/products', verifyUser, adminOnly, authToken, getProduct);
router.get('/admin/products/:id', verifyUser, authToken, adminOnly, getProductById);
router.post('/admin/products/create', verifyUser, authToken, adminOnly, createProduct);
router.patch('/admin/products/update', verifyUser, adminOnly, authToken, updateProduct);
router.delete('/admin/products/:id', verifyUser, adminOnly, authToken, deleteProduct);


// router.get('/admin')

export default router;