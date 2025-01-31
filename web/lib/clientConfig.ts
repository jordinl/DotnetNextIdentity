import type { CreateClientConfig } from "@hey-api/client-fetch";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
});
