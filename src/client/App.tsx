import React, { useState, useEffect } from "react";
import { GET, fetcher } from "./services/fetcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import CompleteNav from "./components/CompleteNav";
import Books from "./views/Books";
import Login from "./views/Login";
import Register from "./views/Register";
import EditBooks from "./views/EditBooks";
import AddBooks from "./views/AddBooks";
import BookDetails from "./views/BookDetails";


interface AppProps { }

const App = (props: AppProps) => {


    return (
        <BrowserRouter>
            <CompleteNav></CompleteNav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books" element={<Books />}></Route>
                <Route path="/books/:id" element={<BookDetails />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/books/new" element={<AddBooks />}></Route>
                <Route path="/books/:id/edit" element={<EditBooks />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
