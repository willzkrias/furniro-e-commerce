import express from "express";
import { searchProduct } from "../Controllers/HomeController.js";
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('test');
})
router.get('/search', searchProduct);

export default router;