import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { fetcher } from '../services/fetcher';



interface RegisterProps { }

const Register = (props: RegisterProps) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetcher('/auth/register', 'POST', { email, password })
      .then(token => {
        localStorage.setItem('token', token)
        navigate('/')
      })
      .catch(()=> console.log('something went wrong/invalid credentials'))
  };
  
  return (
    <Container>
          <Card >
            <Card.Body>
              <Card.Title>
                Register your Book Account
              </Card.Title>
              <Form onSubmit={handleFormSubmit}>
              <Form.Group >
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     />
                </Form.Group>
                <Form.Group >
                  <Form.Label >Password:</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     />
                </Form.Group>
                <Button type='submit'>Register</Button>
              </Form>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Register;