import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product, ProductResult} from "../../models/product";
import {Pagination} from "../../models/pagination";

export const skinetApi = createApi({
    reducerPath: 'shinetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api',
    }),
    endpoints: (build) => ({
        getProducts: build.query<Pagination<Product[]>, void>({
            query:() => '/products?pageSize=50',
            transformResponse: async (response:Pagination<Product[]>) =>{
                return response;
            }
        })
    }),
});

export const {useGetProductsQuery} = skinetApi;