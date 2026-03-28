"use server"

import { revalidateTag } from "next/cache"
import { serverQueryWithReauth } from "./mutation.action";
import { envConfig } from "@/config";
import { tags } from "../tags";

export const jobFeature = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method : "PATCH" });

    for (const tag of tags) {
        revalidateTag(tag, "default");
    }

    return res;
};

const GetFeatureJobs = async () => {
    try {
        const response = await fetch(
            envConfig.serverBaseApi + `/jobs/feature/featured`,
            {
                next: {
                    tags: [tags.featureJobs],
                },
            }
        );
        console.log(response);
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error("Failed to load data");
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetFeatureJobs;