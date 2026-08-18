export const envConfig = {
  serverBaseApi: "http://72.244.153.29:5000/api/v1" ,
  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API,
  hasSSL: process.env.NEXT_PUBLIC_HAS_SSL == "true" ? true : false,
};
