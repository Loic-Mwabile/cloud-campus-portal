import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pure frontend app (mock data via localStorage) — no backend proxy needed.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
