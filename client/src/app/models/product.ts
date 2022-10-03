export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productType: string;
    productBrand: string;
}

export interface ProductBrand {
    id: number;
    name: string
}

export interface ProductType {
    id: number;
    name: string;
}

export interface ProductParams {
    sort: string
    searchTerm?: string;
    typeId: ProductType[];
    brandId: ProductBrand[];
    pageNumber: number;
    pageSize: number;
}