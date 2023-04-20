import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product} from "../../models/product";
import {Pagination} from "../../models/pagination";
import {Brand} from "../../models/brand";
import {Type} from "../../models/Type";
import router from "../../router/Router";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const skinetApi = createApi({
    reducerPath: 'shinetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api',
        responseHandler: async (response) => {
            if (response.ok) {
                await sleep(500);
                return response.json();
            } else {
                const result: any = await response.json();
                switch (result.statusCode) {
                    case 400:
                        if (result.errors) {
                            const modalStateErrors = [];
                            for (const key in result.errors) {
                                if (result.errors[key]) {
                                    modalStateErrors.push(result.errors[key]);
                                }
                            }
                            throw modalStateErrors.flat();
                        } else {
                            throw result;
                        }
                    case 401:
                        console.log(result);
                        throw result;
                    case 404:
                        await router.navigate('/not-found');
                        throw result;
                    case 500:
                        console.log(result)
                        throw result;
                    default:
                        throw result;
                }
            }
        }
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
        }),
        getProduct: build.query<Product, number>({
            query: (id) => ({
                url: `/products/${id}`
            }),
            transformResponse: async (response: Product) => {
                return response;
            }
        }),
    })
})


export const {useGetProductsQuery, useGetBrandsQuery, useGetTypesQuery, useGetProductQuery} = skinetApi;