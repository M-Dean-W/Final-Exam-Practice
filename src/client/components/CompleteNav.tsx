import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CompleteNav = () => {

    const navTo = useNavigate() 

    const logout = () => {
      localStorage.removeItem('token')
      navTo('/login')
    }
    
    return <Navbar bg="info" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/books">Booklist</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/books/new">Add Books</Nav.Link>
            <Button onClick={logout} className='btn-info'>Logout</Button>
        </Nav>
    </Navbar.Collapse>
</Navbar>
  }

interface NavProps {}

export default CompleteNav