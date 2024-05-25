import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';
import dotenv from 'dotenv';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium(),{
    configureServer({ middlewares }) {
      middlewares.use((req, res, next) => {
        if (req.url.endsWith('.env')) {
          res.statusCode = 404;
          res.end();
        } else {
          next();
        }
      });
    },
  },],
})
