import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../services/fetcher';
import { Book, Category } from '../types';


interface AddBooksProps { }

const AddBooks = (props: AddBooksProps) => {

    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState('')
    const [categoryID, setcategoryID] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); 
    const navigate = useNavigate()

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
                                as="textarea"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Price:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                as="textarea"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddBooks;