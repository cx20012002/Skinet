import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = 'https://localhost:5200/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody)
}

const Shop = {
    list: () => requests.get('products')
}

const agent = {
    Shop
}

export default agent;