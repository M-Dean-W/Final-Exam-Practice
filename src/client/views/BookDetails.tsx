import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { fetcher } from "../services/fetcher";
import { useParams } from "react-router-dom";
import { Book } from "../types";
import { Link } from "react-router-dom";

interface BookDetailsProps {}

const BookDetails = (props: BookDetailsProps) => {
    const [book, setBook] = useState<Book[]>([]);
    const id = useParams()

    useEffect(() => {
        
        fetcher(`/api/books/${id}`, "GET").then((book) => setBook(book));
       
    }, []);

    return (
        <Container>
            {book.map(book=>(

            <Card key={book.id}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle>{book.author}</Card.Subtitle>
                <Card.Body>
                <Card.Text>
                    Category: {book.category_id}
                </Card.Text>
                <Card.Text>Price: {book.price}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link  to={`/books/${book.id}/edit`}>Details</Link>
                </Card.Footer>
            </Card>
            ))}
        </Container>
    )
};

export default BookDetails