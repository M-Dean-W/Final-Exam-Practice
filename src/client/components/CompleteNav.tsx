import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap'

interface CompleteNavProps { }

const CompleteNav = (props: CompleteNavProps) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <Navbar>
            <Nav>
                <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
                <Nav.Link as={NavLink} to={'/books'}>Books</Nav.Link>
                <Nav.Link as={NavLink} to={'/books/new'}>Add Books</Nav.Link>
                <Nav.Link as={NavLink} to={'/login'}>Login</Nav.Link>
                <Button onClick={logout} className="btn-info">Logout</Button>
            </Nav>
        </Navbar>
    )
};

export default CompleteNav