import React, { useEffect, useState } from 'react';
import { Book, Category } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetcher } from '../services/fetcher';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface EditBooksProps { }

const EditBooks = (props: EditBooksProps) => {

    const [book, setBook] = useState<Book[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState('')
    const [categoryID, setcategoryID] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); 
    

    if (!token) {
        navigate('/login')
    }

    function getBooks() {

        fetcher(`/api/books/${id}`, 'GET')
            .then((book) => setBook(book))
    }

    // function handleSubmitEdit () {
    //     fetcher(`/api/books/${id}`, 'PUT')
    //       .then(() => {
    //         getBooks()
    //       })
    //   }

    useEffect(() => {
        getBooks()
      }, [])

    const handleDelete = (id:number) =>{
    
        fetcher(`/api/books/${id}`, 'DELETE')
          .then(data => console.log(data.message))
          .then(getBooks)
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
            .then(data => navigate(`/books/${data.id}`))
    };

    return (
        <Container>
            {book.map(book => (
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
                                value={book.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Author:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                as="textarea"
                                value={book.author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Book Price:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                as="textarea"
                                value={book.price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                        <Button className='btn-danger' onClick={() => handleDelete(book.id)}>Delete Book</Button>
                    </Form>
                </Card.Body>
            </Card>
            ))}
        </Container>
    );
};
//     return (
//         <Container>
//             <div className="row justify-content-around p-3">
//                 <div className='col-sm-3 col-md-6'>
//                     {book.map(book => (
//                         <Card key={book.id} className=" bg-light rounded-3 mb-3 mt-2">
//                             <Card.Title className='text-center mt-2'>
//                                 <textarea className='form-control bg-light' value={book.title} onChange={(e) => setTitle(e.target.value)} />
//                             </Card.Title>
//                             <Card.Subtitle className='text-center mt-2'>
//                                 by {book.author}
//                             </Card.Subtitle>
//                             <Card.Body>
//                                 <Card.Text >
//                                     Category: {book.category_id}
//                                 </Card.Text>
//                                 <Card.Text>
//                                     Price: {book.price}
//                                 </Card.Text>
//                             </Card.Body>
//                             <button onClick={() => handleDelete(book.id)} className='bg-danger'>Delete Book</button>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </Container>
//     );
// };

export default EditBooks;