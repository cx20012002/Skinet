import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Product} from "../../app/models/product";
import agent from "../../app/api/agent";
import {RootState} from "../../app/store/store";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            const response = await agent.Shop.list();
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const shopSlice = createSlice({
    name: 'shop',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state, action) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, state => {
            state.status = "idle";
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.shop)