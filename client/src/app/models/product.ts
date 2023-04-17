export interface ProductResult {
    pageIndex: number
    pageSize: number
    count: number
    data: Product[]
}

export interface Product {
    id: number;
    name: string
    description: string
    price: number
    pictureUrl: string
    productType: string
    productBrand: string
}
