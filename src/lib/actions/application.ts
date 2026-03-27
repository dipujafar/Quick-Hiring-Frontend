"use server"
import { revalidateTag } from "next/cache";
import { envConfig } from "@/config";
import { tags } from "../tags";

export const ApplicationToJob = async (payload: string) => {

    const response = await fetch(envConfig.serverBaseApi + '/applications', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: payload,
    });

    if (!response.ok) {
        //error messsage
        const errorData = await response.json().catch(() => null);

        // This will activate the closest `error.js` Error Boundary
        throw new Error(errorData?.message || "Something went wrong, try again");
    }
    const res = await response.json();

    revalidateTag(tags.applications, "max");

    return res;
};