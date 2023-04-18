import React from 'react';
import {Product} from "../models/product";

interface Props {
    product: Product;
}

function ProductItem({product}: Props) {
    return (
        <div key={product.id} className="bg-white overflow-hidden rounded-lg shadow-lg">
            <div className="relative w-full h-64">
                <img src={product.pictureUrl} className="absolute p-5 inset-0 w-full object-contain h-full bg-blue-400" alt=""/>
            </div>
            <div className="px-4 py-5">
                <p className="text-gray-700 font-bold">{product.name}</p>
                <p className="text-gray-700">${product.price}</p>
                <div className="flex justify-between mt-5">
                    <button type="button"
                            className="flex-1 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded-md hover:bg-gray-100">
                        <i className="fa fa-cart-shopping"></i>
                    </button>
                    <button type="button"
                            className="flex-1 ml-2 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded-md hover:bg-gray-100">
                        View
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductItem;