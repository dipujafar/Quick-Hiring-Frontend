import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cookies } from "react-cookie";
import { envConfig } from '@/config';
import { Company } from '@/types';

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.clientBaseApi,
    // credentials: "include",
    prepareHeaders: (headers) => {

        const accessToken = cookies.get("accessToken");

        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }

        return headers;
    },
});

// Refresh the base----------------------------------------------------------------
const baseQueryWithReauth: typeof baseQuery = async (
    args,
    api,
    extraOptions,
) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {

        const refreshToken = cookies.get("refreshToken");

        if (refreshToken) {

            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                    body: { refreshToken: refreshToken },
                },
                api,
                extraOptions,
            ) as { data: { data: { accessToken: string } } };

            // Check if refreshResult contains data and accessToken
            if (refreshResult?.data && refreshResult?.data?.data?.accessToken) {

                const newAccessToken = refreshResult?.data?.data?.accessToken;

                // Save the new token
                cookies.set("accessToken", newAccessToken, {
                    httpOnly: false,
                    maxAge: 14 * 24 * 60 * 60, // 14 days
                    path: '/',
                    sameSite: 'lax',
                    secure: envConfig.hasSSL,
                });

                // Retry the original request with the new token
                result = await baseQuery(args, api, extraOptions);
            } else {

            }
        } else {

        }
    }

    return result;
};


const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ["companies"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        allcompanies: builder.query<{ message: string, data: Company[] }, void>({
            query: () => ({
                url: `/companies`
            }),
            providesTags: ['companies']
        }),
    })
});
export const { useAllcompaniesQuery } = baseApi;
export default baseApi;