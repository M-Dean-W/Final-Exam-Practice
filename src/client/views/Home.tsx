import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetcher } from '../services/fetcher';


interface HomeProps { }

const Home = (props: HomeProps) => {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        fetcher('/api/books', 'GET')
            .then((books) => setBooks(books))
    }, [])


    return (
        <Container>
            <Card className=" bg-light rounded-3 mb-3 mt-2">
                <Card.Title className='text-center mt-2'>
                </Card.Title>
                <Card.Subtitle className='text-center mt-2'>
                </Card.Subtitle>
                <Card.Body>
                    <Card.Text style={{ fontSize: '2em' }} className='text-center'>
                        Welcome to the Williamson Bookstore! Click Booklist to see our list of books. To gain access to add, delete, or update books, please login or register a new account!
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;