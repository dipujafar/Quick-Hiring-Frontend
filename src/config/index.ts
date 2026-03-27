export const envConfig = {
  serverBaseApi: process.env.NEXt_PUBLIC_SERVER_BASE_API,
  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API,
  hasSSL: process.env.NEXT_PUBLIC_HAS_SSL == "true" ? true : false,
};
