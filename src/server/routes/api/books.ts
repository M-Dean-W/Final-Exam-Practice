import { Router } from 'express'
import db from '../../db';
import tokenCheck from '../../middlewares/tokenCheck';

const router = Router();

router.get('/:id', async (req,res) => {
    try {
        tokenCheck
        const id = parseInt(req.params.id, 10)
        const book = await db.books.getOneBook(id)
        res.json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

router.get('/', async (req,res) => {
    try {
        tokenCheck
        const books = await db.books.getALLBooks()
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

router.post('/', async (req,res) => {
    try {
        const { category_id, title, author, price } = req.body
        const bookResult = await db.books.insertBook(category_id, title, author, price || '')
        res.json({ message:'book created', id:bookResult.insertId})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { category_id, title, author, price } = req.body;
        const id = Number(req.params.id);
        await db.books.updateBook(category_id, title, author, price, id);
        res.status(200).json({ message: "book updated successfully" });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.books.deleteBook(id);
        res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;