import { envConfig } from "@/config";


const GetJobDetails = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(
      envConfig.serverBaseApi + `/jobs/${id}`,
    );
    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const res = response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

export default GetJobDetails;