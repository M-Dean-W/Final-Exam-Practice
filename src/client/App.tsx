import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./views/Home";
import CompleteNav from "./components/CompleteNav";
import Books from "./views/Books";
import Login from "./views/Login";
import Register from "./views/Register";


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
        </Routes>
        </BrowserRouter>
    );
};

export default App;

// useEffect(() => {
    //     fetch("http://localhost:3000/api/hello")
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message))
    //         .catch((e) => console.log("[fetch erorr]", e));

    //     /*
    //     Alternatively with fetcher
    //       fetcher("/api/hello", "GET").then((data) => setData(data.message));
    //     OR
    //       GET("/api/hello").then((data) => setData(data.message));
    //     (since both functions automatically parse the JSON and automatically log errors)
    //     */
    // }, []);