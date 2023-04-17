import {configureStore} from "@reduxjs/toolkit";
import {skinetApi} from "./services/skinetApi";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {productSlice} from "./features/productSlice";

export const store = configureStore({
    reducer: {
        [skinetApi.reducerPath]: skinetApi.reducer,
        products: productSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(skinetApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;