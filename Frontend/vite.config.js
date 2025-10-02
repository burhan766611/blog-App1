import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: ['blog-app1-1-frontend.onrender.com'],
  },
});