import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { fetcher } from "../services/fetcher";
import { Book } from "../types";
import { Link } from "react-router-dom";

interface BooksProps { }

const Books = (props: BooksProps) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {

        fetcher("/api/books", "GET").then((books) => setBooks(books));

    }, []);

    return (
        <Container>
            {books.map(book => (

                <Card key={book.id}>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle>{book.author}</Card.Subtitle>
                    <Card.Body>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={`/books/${book.id}`} className='btn btn-secondary'>Details</Link>
                    </Card.Footer>
                </Card>
            ))}
        </Container>
    )
};

export default Books