import React from 'react';
import {errorApi} from "../redux/services/errorApi";
import {useAppDispatch} from "../redux/store";

function Contact() {
    const dispatch = useAppDispatch();

    function test400() {
        dispatch(errorApi.endpoints.getError400.initiate()).then((res:any) => {
            console.log(res.error.data);
        })
    }

    function test401() {
        dispatch(errorApi.endpoints.getError401.initiate()).then((res:any) => {
            console.log(res.error.data);
        })
    }
    function test404() {
        dispatch(errorApi.endpoints.getError404.initiate()).then((res:any) => {
            console.log(res.error.data);
        })
    }
    function test500() {
        dispatch(errorApi.endpoints.getError500.initiate()).then((res:any) => {
            console.log(res.error.data);
        })
    }
   
    
    return (
        <div className="flex w-auto justify-center gap-4">
            <button onClick={test400} className="border border-blue-400 text-blue-400 rounded-lg px-16 py-2">Test 400 error</button>
            <button onClick={test401} className="border border-blue-400 text-blue-400 rounded-lg px-16 py-2">Test 401 error</button>
            <button onClick={test404} className="border border-blue-400 text-blue-400 rounded-lg px-16 py-2">Test 404 error</button>
            <button onClick={test500} className="border border-blue-400 text-blue-400 rounded-lg px-16 py-2">Test 500 error</button>
        </div>
    )
}

export default Contact;