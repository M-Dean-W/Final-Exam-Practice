import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetcher } from '../services/fetcher';
import { Link, useParams } from 'react-router-dom';


interface BookDetailsProps { }

const BookDetails = (props: BookDetailsProps) => {

    const [book, setBook] = useState<Book[]>([])
    const { id } = useParams()

    useEffect(() => {
        fetcher(`/api/books/${id}`, 'GET')
            .then((book) => setBook(book))
    }, [])


    return (
        <Container>
            <div className="row justify-content-around p-3">
                <div className='col-sm-3 col-md-6'>
                    {book.map(book => (
                        <Card key={book.id} className=" bg-light rounded-3 mb-3 mt-2">
                            <Card.Title className='text-center mt-2'>
                                {book.title}
                            </Card.Title>
                            <Card.Subtitle className='text-center mt-2'>
                                by {book.author}
                            </Card.Subtitle>
                            <Card.Body>
                                <Card.Text >
                                    Category: {book.category_id}
                                </Card.Text>
                                <Card.Text>
                                    Price: {book.price}
                                </Card.Text>
                                {/* <Link to={`book/${book.id}`} className='btn btn-secondary'>Edit Me!</Link> */}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default BookDetails;