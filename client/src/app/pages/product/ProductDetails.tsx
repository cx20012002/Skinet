import React from 'react';
import {useParams} from "react-router-dom";
import {useGetProductQuery} from "../../redux/services/skinetApi";
import {Product} from "../../models/product";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/BreadCrumb";
import NotFound from "../NotFound";

function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const param_id = isNaN(parseInt(id!)) ? id : parseInt(id!);
    const {isLoading, data: product} = useGetProductQuery(param_id as any) as {
        isLoading: boolean,
        data: Product
    };
    
    if (isNaN(parseInt(id!))) return <NotFound/>

    if (isLoading) return <Loading content="Loading Product..."/>;

    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <img src={product.pictureUrl} alt={product.name} className="w-full"/>
                    </div>
                    <div className="w-full lg:w-1/2 px-12 sm:px-5">
                        <Breadcrumb productName={product.name}/>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 border-b pb-4">
                            {product.name}
                        </h1>
                        <p className="text-xl lg:text-3xl mb-4">${product.price.toFixed(2)}</p>
                        <div className="mb-4">
                            <table className="mb-10">
                                <tbody>
                                <tr className="border-b">
                                    <td className="font-bold pr-16 py-5">Name</td>
                                    <td className="py-5">{product.name}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-bold pr-16 py-5">Description</td>
                                    <td className="py-5">{product.description}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-bold pr-16 py-5">Type</td>
                                    <td className="py-5">{product.productType}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="font-bold pr-16 py-5">Brand</td>
                                    <td className="py-5">{product.productBrand}</td>
                                </tr>

                                <tr>
                                    <td className="font-bold pr-16 py-5">Quantity in stock</td>
                                    <td className="py-5">100</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mb-10 items-center gap-4">
                            <label htmlFor="quantity" className="mr-4 font-bold">Quantity</label>
                            <input type="number"
                                   className="bg-gray-50 border border-gray-300 p-2 text-gray-900 text-sm rounded-lg block flex-grow focus:outline-0"/>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full md:w-1/2">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;