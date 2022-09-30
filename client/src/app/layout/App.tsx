import React from 'react'
import Header from "./Header";
import {Container, CssBaseline} from "@mui/material";
import {Route} from "react-router-dom";
import homePage from "../../features/Home/HomePage";
import shopPage from "../../features/Shop/shopPage";
import contactPage from "../../features/Contact/ContactPage";

function App() {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Container>
                <Route exact path={'/'} component={homePage}/>
                <Route exact path={'/shop'} component={shopPage}/>
                <Route exact path={'/contact'} component={contactPage}/>
            </Container>
        </>
        
    )
}

export default App