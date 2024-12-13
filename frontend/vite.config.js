// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//    plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         "@backend": path.resolve(__dirname, "backend"), // Use alias to check which files are being bundled
      },
   },
   optimizeDeps: {
      exclude: ["@mapbox/node-pre-gyp", "aws-sdk", "mock-aws-s3", "nock"],
   },
   build: {
      rollupOptions: {
         output: {
            onwarn(warning, warn) {
               console.log("Warning: ", warning); // Log all warnings during the build
               warn(warning); // Ensure warnings are still shown
            },
         },
      },
   },
});
