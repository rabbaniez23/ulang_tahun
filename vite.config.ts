import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Pastikan kedua modul ini ada di dalam array exclude
    exclude: ['lucide-react', 'firebase/firestore'],
  },
});