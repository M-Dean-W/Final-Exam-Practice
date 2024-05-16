import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { fetcher } from "../services/fetcher";

interface BooksProps {}

const Books = (props: BooksProps) => {
    const [data, setData] = useState("");

    useEffect(() => {
        
          fetcher("/api/hello", "GET").then((data) => setData(data.message));
       
    }, []);

    return (
        <Container>
            <Card>
                <Card.Title></Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Body>
                <Card.Text>
                    Welcome to the Bookspage for the Bookstore. Login or Register to gain access to editing and adding books!
                </Card.Text>
                </Card.Body>
                <Card.Footer></Card.Footer>
            </Card>
        </Container>
    )
};

export default Books