import { Router } from "express";
import db from "../../db";
import { compareHash } from "../../services/passwords";
import * as jwt from 'jsonwebtoken'
import config from "../../config";

const router = Router();

router.post('/', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const [userFound] = await db.users.findUser('email', email)
        if (userFound && compareHash(password, userFound.password)) {
           const token = jwt.sign(
            { userid: userFound.id, email: userFound.email },
            config.jwt.secret,
            { expiresIn:'15d' }
        ) 
           return res.json(token)
        }
        return res.status(401).json({ message: 'invalid credentials' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error', error })
    }
});

export default router