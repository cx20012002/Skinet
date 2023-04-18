import {useGetBrandsQuery, useGetProductsQuery, useGetTypesQuery} from "../redux/services/skinetApi";
import {Product} from "../models/product";
import ProductItem from "../components/ProductItem";
import {Brand} from "../models/brand";
import {Type} from "../models/Type";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useEffect, useState} from "react";
import {setPageNumber, setSearch, setSelectBrand, setSelectType, setSort} from "../redux/features/productSlice";
import Pagination from "../components/Pagination";

interface Params {
    brandId?: number | string;
    typeId?: number | string;
    sort?: string;
    pageIndex?: number;
    search?: string;
}

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceAsc', label: 'Price: Low to high'},
    {value: 'priceDesc', label: 'Price: High to low'},
]

function Shop() {
    const dispatch = useAppDispatch();
    const {brandsIdSelected, typesIdSelected, sort, pageNumber, search, isLoaded} = useAppSelector(state => state.products);
    const [searchValue, setSearchValue] = useState('');
    const params: Params = {
        brandId: brandsIdSelected || '',
        typeId: typesIdSelected || '',
        sort: sort,
        pageIndex: pageNumber,
        search: search
    };
    
    const {
        data: response,
        isFetching: isProductsFetching,
    } = useGetProductsQuery(params);
    const {data: brands, isFetching: isBrandsFetching} = useGetBrandsQuery();
    const {data: types, isFetching: isTypesFetching} = useGetTypesQuery();

    for (let key in params) {
        if (params.hasOwnProperty(key) && params[key as keyof Params] === '') {
            delete params[key as keyof Params];
        }
    }

    useEffect(() => {
    }, [brandsIdSelected, typesIdSelected, sort, pageNumber, search, isLoaded])

    if (isProductsFetching || isBrandsFetching || isTypesFetching) {
        return <div>Loading...</div>
    }

    if (!response || !brands || !types) {
        return <h1>Data not loaded correctly</h1>;
    }
    
    function handleSortChange(e: any) {
        dispatch(setSort(e.target.value));
    }

    function handleBrandChange(e: any) {
        dispatch(setSelectBrand(e.target.value));

    }

    function handleTypeChange(e: any) {
        dispatch(setSelectType(e.target.value));
    }

    function handlePageChange(page: number) {
        dispatch(setPageNumber(page));
    }

    function handleSearchChange(e: any) {
        setSearchValue(e.target.value);
    }
    
    function handleSearchSubmit(e: any) {
        e.preventDefault();
        dispatch(setSearch(searchValue));
    }
    
    function resetFilters() {
        dispatch(setSelectBrand(''));
        dispatch(setSelectType(''));
        dispatch(setSort(''));
        dispatch(setSearch(''));
        dispatch(setPageNumber(1));
        setSearchValue('');
    }

    return (
        <div className="container pt-36 grid grid-cols-1 sm:grid-cols-12 mx-auto gap-12">
            <div className="col-span-12 lg:col-span-3 md:col-span-3">
                <h5 className="font-bold text-xl mb-2">Sort</h5>
                <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-10`}
                    onChange={handleSortChange} value={sort}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <h5 className="font-bold text-xl mb-2">Brands</h5>
                <ul className="mb-10 bg-gray-100 rounded-xl p-5">
                    {brands.map((brand: Brand) => (
                        <li
                            value={brand.id}
                            onClick={handleBrandChange}
                            className={`w-full border-b-2 border-gray-200 py-4 last:border-b-0 cursor-pointer hover:text-blue-900 ${brand.id === brandsIdSelected ? 'font-bold text-blue-900' : ''}`}
                            key={brand.id}>{brand.name}</li>
                    ))}
                </ul>
                <h5 className="font-bold text-xl mb-2">Types</h5>
                <ul className="mb-10 bg-gray-100 rounded-xl p-5">
                    {types.map((type: Type) => (
                        <li
                            value={type.id}
                            onClick={handleTypeChange}
                            className={`w-full border-b-2 border-gray-200 py-4 last:border-b-0 cursor-pointer hover:text-blue-900 ${type.id === typesIdSelected ? 'font-bold text-blue-900' : ''}`}
                            key={type.id}>{type.name}</li>
                    ))}
                </ul>
            </div>

            <div className="col-span-12 lg:col-span-9 md:col-span-9">
                <div className="flex items-center justify-between py-2 mb-3">
                    {
                        !response.count
                            ? (
                                <div className="text-lg">No products found</div>
                            )
                            : (
                                <div className="text-lg">
                                    Showing
                                    <strong className="font-bold"> {(pageNumber - 1) * response.pageSize + 1} -
                                        {' '}{(pageNumber - 1) * response.pageSize + response.data.length}
                                    </strong> of
                                    <span className="font-bold"> {response.count} </span>
                                    results
                                </div>
                            )
                    }

                    <div className="flex items-center space-x-2">
                        <input type="text"
                               value={searchValue}
                               onKeyUp={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                               onChange={handleSearchChange}
                               className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none"
                               placeholder="Search..."/>
                        <button onClick={handleSearchSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Search
                        </button>
                        <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Reset
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {response.data.map((product: Product) => (
                        <ProductItem product={product} key={product.id}/>
                    ))}
                </div>
                <div className="mt-10">
                    {!!response.count &&
                        <Pagination
                            currentPage={pageNumber}
                            pageSize={response.pageSize}
                            totalItems={response.count}
                            onPageChange={handlePageChange}
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default Shop;