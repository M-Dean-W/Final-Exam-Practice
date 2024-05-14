import React, { useEffect, useState } from 'react';
import { Book, Category } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetcher } from '../services/fetcher';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


interface EditBooksProps { }

const EditBooks = (props: EditBooksProps) => {

    const [book, setBook] = useState<Book[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [author, setAuthor] = useState<string>('');
    const [price, setPrice] = useState<number>(0.00);
    const [title, setTitle] = useState<string>('')
    const [categoryID, setcategoryID] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);


    if (!token) {
        navigate('/login')
    }

    function getBooks() {

        fetcher(`/api/books/${id}`, 'GET')
            .then(book => {
                setBook(book)
                setAuthor(book.author)
                setTitle(book.title)
                setPrice(book.price)
            })

    }

    useEffect(() => {
        getBooks()
    }, [])

    const handleDelete = (id: number) => {

        fetcher(`/api/books/${id}`, 'DELETE')
            .then(data => console.log(data.message))
            navigate('/books')
    }

    useEffect(() => {
        fetcher('/api/categories')
            .then(categories => setCategories(categories))
    }, [])

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!categoryID) {
            console.error('Please select category.');
            return;
        }

        const bookData: Omit<Book, 'id' | 'created_at'> = {
            category_id: categoryID,
            author: author,
            title: title,
            price: price,
        };

        fetcher(`/api/books/${id}`, 'PUT', bookData)
            .then 
            navigate(`/books/${id}`)
    };

    return (
        <Container>
            <Card className='m-4 bg-info' id='book-box'>
                <Card.Body>
                    <Card.Title className='p-2'>
                    </Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Select size='lg' className='bg-light' value={categoryID ?? ''} onChange={(e) => setcategoryID(Number(e.target.value) || null)}>
                            <option>Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>))}
                        </Form.Select>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Title:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Author:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                type='text'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Price:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                        {book.map(book => (
                            <Button key={book.id} className='btn-danger' onClick={() => handleDelete(book.id)}>Delete Book</Button>
                        ))}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditBooks;