import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const errorApi = createApi({
    reducerPath: 'errorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api',
        responseHandler: async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const result: any = await response.json();

                switch (response.status) {
                    case 400:
                        if (result.errors) {
                            const modalStateErrors = [];
                            for (const key in result.errors) {
                                if (result.errors[key]) {
                                    modalStateErrors.push(result.errors[key]);
                                }
                            }
                            throw modalStateErrors.flat();
                        } else {
                            throw result;
                        }
                    case 401:
                        throw result;
                    case 404:
                        throw result;
                    case 500:
                        throw result;
                    default:
                        throw result;
                }
            }
        }
    }),
    endpoints: (build) => ({
        getError400: build.query<any, void>({query: () => ('/buggy/badrequest')}),
        getError401: build.query<any, void>({query: () => ('/buggy/auth')}),
        getError404: build.query<any, void>({query: () => ('/buggy/notfound')}),
        getError500: build.query<any, void>({query: () => ('/buggy/servererror')})
    })
})


export const {useGetError500Query} = errorApi;