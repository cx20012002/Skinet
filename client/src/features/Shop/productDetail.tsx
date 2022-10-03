import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {useParams} from "react-router-dom";
import {fetchProductAsync, productSelectors} from "./shopSlice";
import {Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import HomePage from "../Home/HomePage";

function ProductDetail() {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id));

    useEffect(() => {
        if (!product) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, dispatch, product])

    if (!product) return <HomePage/>;

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant={"h3"}>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant={"h4"} color={"secondary"}>${(product.price).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.productType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.productBrand}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default ProductDetail