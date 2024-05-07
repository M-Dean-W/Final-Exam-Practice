import { Router } from "express";
import db from "../../db";
import { generateHash } from "../../services/passwords";
import * as jwt from 'jsonwebtoken'
import config from "../../config";

const router = Router();

router.post('/', async (req, res) => {
    const newUser = req.body
    try {
        newUser.password = generateHash(newUser.password)
        const result = await db.users.registerUser(newUser)
        const token = jwt.sign(
            { userid: result.insertId, email: newUser.email, created_at: newUser.created_at },
            config.jwt.secret,
            { expiresIn: '15d' }
        )
        return res.json(token)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error', error })
    }
});

export default router