import {configureStore} from "@reduxjs/toolkit";
import {shopSlice} from "../../features/Shop/shopSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// export function configureStore(){
//     return legacy_createStore(shopReducer);
// }

export const store = configureStore({
    reducer : {
        shop: shopSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;