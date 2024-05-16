import Router from "express";
import db from '../../db'
import tokenCheck from "../../middlewares/tokenCheck";

const router = Router()

router.get('/:id', async (req, res) => {

    try {
        const id = parseInt(req.params.id, 10)
        const categories = await db.cat.getOneCategory(id)
        res.json(categories)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
})

router.get('/', async (req, res) => {

    try {
        
        const categories = await db.cat.getAllCategories()
        res.json(categories)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
    
})


export default router