import React, { useState, useEffect } from "react";
import { GET, fetcher } from "./services/fetcher";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import CompleteNav from "./components/CompleteNav";
import Books from "./views/Books";
import Login from "./views/Login";
import Register from "./views/Register";
import EditBooks from "./views/EditBooks";
import AddBooks from "./views/AddBooks";
import BookDetails from "./views/BookDetails";


interface AppProps {}

const App = (props: AppProps) => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/hello")
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .catch((e) => console.log("[fetch erorr]", e));

        /*
        Alternatively with fetcher
          fetcher("/api/hello", "GET").then((data) => setData(data.message));
        OR
          GET("/api/hello").then((data) => setData(data.message));
        (since both functions automatically parse the JSON and automatically log errors)
        */
    }, []);

    return (
        <BrowserRouter>
        <CompleteNav></CompleteNav>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/" element={<Books/>}></Route>
        <Route path="/" element={<BookDetails/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/" element={<Register/>}></Route>
        <Route path="/" element={<AddBooks/>}></Route>
        <Route path="/" element={<EditBooks/>}></Route>
        </BrowserRouter>
    );
};

export default App;
