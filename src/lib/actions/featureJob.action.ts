"use server"

import { revalidateTag } from "next/cache"
import { serverQueryWithReauth } from "./mutation.action";

export const jobFeature = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method : "PATCH" });

    for (const tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
};