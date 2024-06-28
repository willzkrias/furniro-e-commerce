import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const privateKey = process.env.jwt_private.replace(/\\n/g, '\n');

const publicKey = process.env.jwt_public.replace(/\\n/g, '\n');
// export const generateToken = (user) => {
//     return jwt.sign({ id: user, name: user.name, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
// };
// generate token jwt
export const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    };
    //  MENGGUNAKAN ALGORITMA HS256
    // return jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // MENGGUNAKAN ALGORITMA RS256
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

};

export const authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: "Access denied, no token provided" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: "Access denied, no token provided" });

    try {
        const verified = jwt.verify(token, publicKey, { algorithms: ['RS256'] });


        // Pastikan role user adalah Admin
        if (verified.role !== 'Admin') return res.status(401).json({ msg: "Access denied, only admin" });
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token" });
    }
};


// Ganti ini dengan kunci publik atau kunci rahasia Anda yang sebenarnya







export const verifyUser = async (req, res, next) => {

    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun anda" });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.userId = user.id;
    req.role = user.role;
    next();

}

export const decodeJWT = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Error! Authorization header was not provided."
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }

    try {
        // Decoding the token
        const decodedToken = jwt.verify(token, publicKey);

        return res.status(200).json({
            success: true,
            data: {
                userId: decodedToken.userId,
                email: decodedToken.email
            }
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Error! Invalid token."
        });
    }
};

