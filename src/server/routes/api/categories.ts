import { Router } from 'express'
import db from '../../db';


const router = Router();

router.get('/:id',  async (req,res) => {
    try {
        const id = parseInt(req.params.id, 10)
        const category = await db.cat.getOneCategory(id)
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

router.get('/', async (req,res) => {
    try {
        const categories = await db.cat.getALLCategories()
        res.json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

export default router;