"use server"
import { revalidateTag } from "next/cache"
import { serverQueryWithReauth } from "./mutation.action";
import { tags } from "../tags";


export const postNewJob = async ({ payload }: { payload: FormData | string }) => {

    const res = await serverQueryWithReauth({ payload, endPoint: "/jobs", method: "POST" });

    revalidateTag(tags.jobs, "max");

    return res;
}

export const updateJob = async ({ payload, endPoint }: { payload: FormData | string, endPoint: string }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method: "PATCH" });

    revalidateTag(tags.jobs, "max");

    return res;
}

export const DeleteJob = async ({ payload, endPoint }: { payload: FormData | string, endPoint: string }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method: "DELETE" });

    revalidateTag(tags.jobs, "max");
    revalidateTag(tags.featureJobs, "max");

    return res;
}