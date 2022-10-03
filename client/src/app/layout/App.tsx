import React from 'react'
import Header from "./Header";
import {Container, CssBaseline} from "@mui/material";
import {Route, Switch} from "react-router-dom";
import homePage from "../../features/Home/HomePage";
import shopPage from "../../features/Shop/shopPage";
import contactPage from "../../features/Contact/ContactPage";
import ProductDetail from "../../features/Shop/productDetail";

function App() {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Container>
                <Switch>
                    <Route exact path={'/'} component={homePage}/>
                    <Route exact path={'/shop'} component={shopPage}/>
                    <Route exact path={'/shop/:id'} component={ProductDetail}/>
                    <Route exact path={'/contact'} component={contactPage}/>
                </Switch>
            </Container>
        </>

    )
}

export default App