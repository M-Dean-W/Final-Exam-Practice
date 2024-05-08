import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetcher } from '../services/fetcher';
import { Link } from 'react-router-dom';


interface HomeProps { }

const Home = (props: HomeProps) => {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetcher('/api/books', 'GET')
      .then((books) => setBooks(books))
  },[])


  return (
    <Container>
      <div className="row justify-content-around p-3">
        <div className='col-sm-3 col-md-6'>
          {books.map(book => (
            <Card key={book.id} className=" bg-light rounded-3 mb-3 mt-2">
              <Card.Title className='text-center mt-2'>
                {book.title}
              </Card.Title>
              <Card.Subtitle className='text-center mt-2'>
                by {book.author}
              </Card.Subtitle>
              <Card.Body>
                <Card.Text >
                </Card.Text>
                <Link to={`books/${book.id}`} className='btn btn-danger '>Details</Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;