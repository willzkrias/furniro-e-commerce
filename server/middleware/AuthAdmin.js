import jwt from "jsonwebtoken";
import express from "express";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "./AuthUser.js";
const prisma = new PrismaClient();

// export const LoginAdmin = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const user = await prisma.user.findUnique({
//             where: { email: email },
//         });
//         if (!user || !user.password) {
//             return res.status(403).json({ msg: "User with existing account cannot login as admin" });
//         }

//         if (user.role === "User") return res.status(403).json({ msg: "Akses dilarang untuk user" });

//         const validPassword = await argon2.verify(user.password, password);
//         if (!validPassword) return res.status(400).json({ msg: "Invalid password" });

//         req.session.userId = user.id;

//         // Check if there is a valid token in the session
//         if (req.session.token) {
//             try {
//                 jwt.verify(req.session.token, publicKey, { algorithms: ['RS256'] });
//                 return res.status(200).json({
//                     statusCode: 200,
//                     msg: "Login successful as Admin",
//                     data: { token: req.session.token }
//                 });
//             } catch (error) {
//                 // Token is not valid, generate a new one
//             }
//         }

//         const token = generateToken(user);
//         req.session.token = token;
//         res.status(200).json({
//             statusCode: 200,
//             msg: "Login successful as Admin",
//             data: { token: token }
//         });

//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// };
export const LoginAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    // const userId = req.session.userId

    if (req.session.userId) {
        return res.status(400).json({
            msg: "You Already Logged in "
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user || !user.password) {
            return res.status(403).json({ msg: "User with existing account cannot login as admin" });
        }

        if (user.role === "User") return res.status(403).json({
            msg: "Akses dilarang untuk user"
        });

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) return res.status(400).json({ msg: "Invalid password" });
        req.session.userId = user.id;
        const token = generateToken(user);
        res.status(200).json({
            statusCode: 200,
            msg: "Login successfull as Admin",
            // token: token,
            data: {
                token: token
            },

        })

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }



}
export const adminOnly = async (req, res, next) => {


    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.session.userId,
            },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.role !== "Admin") {
            return res.status(403).json({ msg: "This access is for admins only" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.message });
    }
};