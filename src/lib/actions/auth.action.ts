"use server"
import { envConfig } from "@/config";
import { cookies } from "next/headers";

export const Singin = async (payload: string) => {

    const cookieStore = await cookies();

    const response = await fetch(envConfig.serverBaseApi + '/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: payload,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Something went wrong, try again");
    }
    const res = await response.json();

    const newAccessToken = res?.data?.accessToken;
    const newRefreshToken = res?.data?.refreshToken;

    // Save new access token cookie
    cookieStore.set('accessToken', newAccessToken, {
        httpOnly: false,
        maxAge: 1 * 24 * 60 * 60, //1 day
        path: '/',
        sameSite: 'lax',
        secure: envConfig.hasSSL,
    });

    cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60, //7 days
        path: '/',
        sameSite: 'lax',
        secure: envConfig.hasSSL,
    });

    return res;
};

export const Logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return;
};