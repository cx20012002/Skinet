import React from 'react'
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Product} from "../../app/models/product";
import {currencyFormat} from "../../app/util/util";
import {LoadingButton} from "@mui/lab";
import {Link} from "react-router-dom";

interface Props {
    product: Product;
}

function ProductCard({product}: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "secondary.main"}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: "bold", color: "primary.light"}
                }}
            />
            <CardMedia
                image={product.pictureUrl}
                sx={{height: 140, backgroundSize: "contain", bgcolor: "primary.light"}}
            />
            <CardContent>
                <Typography gutterBottom color={"secondary"} variant={"h5"}>
                    ${product.price}
                </Typography>
                <Typography color={"text.secondary"} variant={"body2"}>
                    {product.productBrand} / {product.productType}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton size={"small"}>
                    Add to Cart
                </LoadingButton>
                <Button component={Link} to={`shop/${product.id}`} size={"small"}>View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard