import {createSlice} from '@reduxjs/toolkit';
import {skinetApi} from "../services/skinetApi";
import {ProductResult} from "../../models/product";

interface ProductState {
    data: ProductResult;
    isLoad: boolean;
}

const initialState: ProductState =
{
    data:{} as ProductResult,
    isLoad: false
}


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(skinetApi.endpoints.getProducts.matchPending, (state) => {
            state.isLoad = false;
            console.log('fucking pending')
        });
        builder.addMatcher(skinetApi.endpoints.getProducts.matchFulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoad = true;
            console.log('fucking done')
        });
    },
});

export default productSlice.reducer;
