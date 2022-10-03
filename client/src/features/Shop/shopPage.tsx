import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {fetchBrands, fetchProductsAsync, fetchTypes, productSelectors, setProductParams} from "./shopSlice";
import {
    FormControl,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import CheckBoxButton from "../../app/components/CheckBoxButton";
import ProductList from "./productList";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import {ProductBrand, ProductType} from "../../app/models/product";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]


function ShopPage() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, brandsLoaded, typesLoaded, status, brandId, typeId} = useAppSelector(state => state.shop);
    const {productParams} = useAppSelector(state => state.shop);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!brandsLoaded) dispatch(fetchBrands());
    }, [brandsLoaded, dispatch])

    useEffect(() => {
        if (!typesLoaded) dispatch(fetchTypes());
    }, [typesLoaded, dispatch])

    if (status.includes('pending')) return <h1>Loading...</h1>


    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <TextField
                        label={"Search products"}
                        variant={"outlined"}
                        fullWidth
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl component={"fieldset"}>
                        <RadioButtonGroup
                            options={sortOptions}
                            onChange={e => dispatch(setProductParams({sort: e.target.value}))}
                            selectedValue={productParams.sort}
                        />
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckBoxButton
                        items={brandId}
                        onChange={(items: ProductBrand[] | ProductType[]) => dispatch(setProductParams({brandId: items}))}
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
        </Grid>
    )
}

export default ShopPage