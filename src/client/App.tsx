import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./views/Home";
import CompleteNav from "./components/CompleteNav";
import Books from "./views/Books";
import Login from "./views/Login";
import Register from "./views/Register";
import BookDetails from "./views/BookDetails";
import AddBooks from "./views/AddBooks";
import EditBooks from "./views/EditBooks";


interface AppProps {}

const App = (props: AppProps) => {

    return (
        <BrowserRouter>
        <CompleteNav></CompleteNav>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/books' element={<Books />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/books/:id' element={<BookDetails />}></Route>
            <Route path='/books/:id/edit' element={<EditBooks />}></Route>
            <Route path='/books/new' element={<AddBooks />}></Route>
        </Routes>
        </BrowserRouter>
    );
};

export default App;
