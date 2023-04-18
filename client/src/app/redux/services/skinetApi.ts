import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product} from "../../models/product";
import {Pagination} from "../../models/pagination";
import {Brand} from "../../models/brand";
import {Type} from "../../models/Type";

export const skinetApi = createApi({
    reducerPath: 'shinetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api',
    }),
    endpoints: (build) => ({
        getProducts: build.query<Pagination<Product[]>, {}>({
            query: (args) => ({
                url: '/products',
                params: {...args}
            }),
            transformResponse: async (response: Pagination<Product[]>) => {
                return response;
            }
        }),
        getBrands: build.query<Brand[], void>({
            query: () => ({
                url: '/products/brands'
            }),
            transformResponse: async (response: Brand[]) => {
                return [{id: 0, name: 'All'}, ...response];
            }
        }),
        getTypes: build.query<Type[], void>({
            query: () => ({
                url: '/products/types'
            }),
            transformResponse: async (response: Type[]) => {
                return [{id: 0, name: 'All'}, ...response];
            }
        })
    }),
});

export const {useGetProductsQuery, useGetBrandsQuery, useGetTypesQuery} = skinetApi;