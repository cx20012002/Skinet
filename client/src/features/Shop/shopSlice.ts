import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Product, ProductBrand, ProductParams, ProductType} from "../../app/models/product";
import agent from "../../app/api/agent";
import {RootState} from "../../app/store/store";


interface CatalogState {
    productsLoaded: boolean;
    brandsLoaded: boolean;
    typesLoaded: boolean;
    status: string;
    brandId: ProductBrand[];
    typeId: ProductType[];
    productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams){
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('sort', productParams.sort);
    
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brandId?.length > 0) params.append('brandId', productParams.brandId.toString());
    if (productParams.typeId?.length > 0) params.append('typesId', productParams.typeId.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'shop/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().shop.productParams);
        try {
            const response = await agent.Shop.list(params);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'shop/fetchProductAsync',
    async (id: number) => {
        try {
            return await agent.Shop.details(id);
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchBrands = createAsyncThunk(
    'shop/fetchBrands',
    async () => {
        try {
            return await agent.Shop.fetchBrands();
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchTypes = createAsyncThunk(
    'shop/fetchTypes',
    async () => {
        try {
            return await agent.Shop.fetchTypes();
        } catch (error) {
            console.log(error)
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        sort: 'name',
        brandId: [],
        typeId: []
    }
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        brandsLoaded: false,
        typesLoaded: false,
        status: 'idle',
        brandId: [],
        typeId: [],
        productParams: initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams.brandId = {...state.productParams, ...action.payload, pageNumber: 1};
        }
    },
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
        });
        builder.addCase(fetchProductAsync.pending, state => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        })
        builder.addCase(fetchBrands.pending, (state, action) => {
            state.status = 'pendingFetchBrands';
        });
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            state.brandId = action.payload;
            state.brandsLoaded = true;
            state.status = 'idle'
        });
        builder.addCase(fetchBrands.rejected, state => {
            state.status = 'idle'
        })
        builder.addCase(fetchTypes.pending, (state, action) => {
            state.status = 'pendingFetchTypes';
        });
        builder.addCase(fetchTypes.fulfilled, (state, action) => {
            state.typeId = action.payload;
            state.typesLoaded = true;
            state.status = 'idle'
        });
        builder.addCase(fetchTypes.rejected, state => {
            state.status = 'idle'
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.shop);
export const {setProductParams} = shopSlice.actions;