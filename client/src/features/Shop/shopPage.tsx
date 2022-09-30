import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {fetchProductsAsync, productSelectors} from "./shopSlice";
import {Typography} from "@mui/material";

function ShopPage() {

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.shop);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded])

    if (status.includes('pending')) return <h1>Loading...</h1>

    return (
        <>
            {products.map(product => (
                <Typography variant={"h2"} key={product.id}>{product.name}</Typography>
            ))}
        </>
    )
}

export default ShopPage