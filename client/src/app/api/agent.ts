import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = 'https://localhost:5200/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody)
}

const Shop = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchBrands: () => requests.get('products/brands'),
    fetchTypes: () => requests.get('products/types')
}

const agent = {
    Shop
}

export default agent;