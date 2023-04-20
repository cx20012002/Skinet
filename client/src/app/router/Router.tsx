import {createBrowserRouter, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import App from "../layout/App";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/product/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <Home/>},
            {path: "shop", element: <Shop/>},
            {path: "shop/:id", element: <ProductDetails/>},
            {path: "contact", element: <Contact/>},
            {path: "not-found", element: <NotFound/>},
            {path: "*", element: <Navigate replace to="/not-found"/>},
        ]
    }
]);

export default router;