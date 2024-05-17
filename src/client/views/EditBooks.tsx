import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { fetcher } from "../services/fetcher";
import Form from 'react-bootstrap/Form'
import { Category } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";
import { Button } from "react-bootstrap";

interface EditBooksProps { }

const EditBooks = (props: EditBooksProps) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [catID, setCatID] = useState<number | null>(null)
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const [book,setBook] = useState<Book[]>([])

    if (!token) {
        navigate('/login')
    }

    useEffect(() => {

        fetcher("/api/categories", "GET").then((categories) => setCategories(categories));

    }, []);

    useEffect(()=> {
        fetcher(`/api/books/${id}`, "GET")
        .then(book => {
            setBook(book)
            setTitle(book[0].title)
            setAuthor(book[0].author)
            setPrice(book[0].price)
        })
    },[])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!catID) {
            alert('Choose Category')
            return
        }

        const bookData: Omit<Book, 'id' | 'created_at'> = {
            category_id:catID,
            author:author,
            title:title,
            price:price
        }

        fetcher(`/api/books/${id}`, 'PUT', bookData)
        .then
        navigate(`/books/${id}`)
    
    }

    const handleDelete = (id: number) => {

        fetcher(`/api/books/${id}`, 'DELETE')
            .then(data => console.log(data.message))
            navigate('/books')
    }

    return (
        <Container>
            <Card>
                <Card.Title></Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Select value={catID ?? ''} onChange={(e)=>setCatID(Number(e.target.value))}>
                            <option>Select Category</option>
                            {categories.map(category =>(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Group>
                            <Form.Label>Book Title:</Form.Label>
                            <Form.Control type="text" value={title } onChange={(e)=> setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Author:</Form.Label>
                            <Form.Control type="text" value={author } onChange={(e)=>setAuthor(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Price:</Form.Label>
                            <Form.Control type="number" value={price } onChange={(e)=>setPrice(Number(e.target.value))} />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                {book.map(book => (
                            <Button key={book.id} className='btn-danger' onClick={() => handleDelete(book.id)}>Delete Book</Button>
                        ))}
                </Card.Footer>
            </Card>
        </Container>
    )
};

export default EditBooks