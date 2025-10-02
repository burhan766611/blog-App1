import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  preview: {
    host: true,
    allowedHosts: ['blog-app1-1-frontend.onrender.com'],
  },
});


