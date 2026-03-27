import { envConfig } from "@/config";
import { serverQueryWithReauth } from "./mutation.action";
import { tags } from "../tags";

export const GetJobs = async ({
  query,
}: {
  query: { [key: string]: string };
}) => {
  try {
    const queryString = query
      ? `?${new URLSearchParams(query).toString()}`
      : "";

    const response = await fetch(
      envConfig.serverBaseApi + "/jobs" + queryString,
      {
        next: {
          tags: [tags.jobs],
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(errorData?.message || "Failed to load jobs");
    }
    const res = response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetApplications = async ({
  query,
}: {
  query: { [key: string]: string };
}) => {
  const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

  try {
    const res = await serverQueryWithReauth({
      endPoint: "/applications" + queryString,
      method: "GET",
      tags: [tags.applications],
    });
    return res;
  } catch (err) {
    throw err;
  }
};
