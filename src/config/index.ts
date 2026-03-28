export const envConfig = {
  serverBaseApi: "http://206.162.244.154:7128/api/v1" ,
  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API,
  hasSSL: process.env.NEXT_PUBLIC_HAS_SSL == "true" ? true : false,
};
