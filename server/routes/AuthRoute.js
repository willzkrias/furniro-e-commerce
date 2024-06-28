import express from "express";
import { Login, Logout, Me } from "../Controllers/Auth.js";
import { authToken } from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/me', Me);
router.post('/login', Login, authToken);
router.delete('/logout', Logout, authToken);


export default router;