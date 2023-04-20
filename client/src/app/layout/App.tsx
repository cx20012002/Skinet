import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <Header/>
            <div className="container pt-36  mx-auto">
                <Outlet/>
            </div>
        </>
    );
}

export default App;
