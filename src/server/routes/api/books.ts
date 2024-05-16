import Router from "express";
import db from '../../db'
import tokenCheck from "../../middlewares/tokenCheck";

const router = Router()

router.get('/:id', async (req, res) => {

    try {
        const id = parseInt(req.params.id, 10)
        const book = await db.books.getOneBook(id)
        res.json(book)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
})

router.get('/', async (req, res) => {

    try {
        
        const book = await db.books.getAllBooks()
        res.json(book)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
    
})

router.post('/', tokenCheck, async (req, res) => {

    try {
        const {category_id, title, author, price} = req.body
        const bookResult = await db.books.addBook(category_id,title,author,price || '')
        res.json({message:'Book added', id:bookResult.insertId})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
})

router.put('/:id', tokenCheck, async (req, res) => {

    try {
        const id = parseInt(req.params.id, 10)
        const {category_id, title, author, price} = req.body
        await db.books.updateBook(category_id,title,author,price,id)
        res.status(200).json({message: 'Book Updated'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
})

router.delete('/:id', tokenCheck, async (req, res) => {

    try {
        const id = parseInt(req.params.id, 10)
        await db.books.deleteBook(id)
        res.status(200).json({message: "Book has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
    
})

export default router