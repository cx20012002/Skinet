import React from 'react';
import Header from "./Header";
import {useGetProductsQuery} from "../redux/services/skinetApi";

function App() {
    const {data:response, isSuccess} = useGetProductsQuery();
    if (!isSuccess) return <div>Loading...</div>

    return (
        <>
            <Header/>
            {
                response.data.map(product => (
                    <div key={product.name}>{product.name}</div>
                ))
            }
        </>

    );
}

export default App;
