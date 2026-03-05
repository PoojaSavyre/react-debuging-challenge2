import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/tests/**'],
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
});
