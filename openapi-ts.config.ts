import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './Api/obj/Api.json',
  output: './web/lib/gen',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './web/lib/clientConfig.ts'
    }
  ],
});
