import {createSlice} from '@reduxjs/toolkit';
import {skinetApi} from "../services/skinetApi";
import {ProductResult} from "../../models/product";
import {Brand} from "../../models/brand";
import {Type} from "../../models/Type";

interface ProductState {
    data: ProductResult;
    brands: Brand[];
    types: Type[];
    sort: string;
    search: string;
    brandsIdSelected: number;
    typesIdSelected: number;
    isLoaded: boolean;
    pageNumber: number;
}


const initialState: ProductState =
{
    data: {} as ProductResult,
    brands: [],
    types: [],
    sort: 'name',
    search: '',
    brandsIdSelected: 0,
    typesIdSelected: 0,
    isLoaded: false,
    pageNumber: 1
}


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.pageNumber = 1;
            state.sort = action.payload;
        },
        setSelectBrand: (state, action) => {
            state.pageNumber = 1;
            state.brandsIdSelected = action.payload;
        },
        setSelectType: (state, action) => {
            state.pageNumber = 1;
            state.typesIdSelected = action.payload;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setSearch: (state, action) => {
            state.pageNumber = 1;
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(skinetApi.endpoints.getProducts.matchFulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addMatcher(skinetApi.endpoints.getBrands.matchFulfilled, (state, action) => {
            state.brands = action.payload;
        });
        builder.addMatcher(skinetApi.endpoints.getTypes.matchFulfilled, (state, action) => {
            state.types = action.payload;
        });
    },
});

export const {setSelectBrand, setSelectType, setSort, setPageNumber, setSearch} = productSlice.actions;