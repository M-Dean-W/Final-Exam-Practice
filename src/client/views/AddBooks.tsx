import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../services/fetcher';
import { Book, Category } from '../types';
import { InputGroup } from 'react-bootstrap';


interface AddBooksProps { }

const AddBooks = (props: AddBooksProps) => {

    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState<number>(0.00);
    const [title, setTitle] = useState('')
    const [categoryID, setcategoryID] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    if (!token) {
        navigate('/login')
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

        fetcher('/api/books', 'POST', bookData)
            .then(data => navigate(`/books/${data.id}`))
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
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control 
                                className='bg-light'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))} aria-label="Dollar amount (with dot and two decimal places)" 
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddBooks;