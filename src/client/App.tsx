import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./views/Home";


interface AppProps {}

const App = (props: AppProps) => {

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
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