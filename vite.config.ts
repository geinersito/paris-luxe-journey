
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8082,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 8082,
      clientPort: 8082,
      timeout: 5000
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
    headers: {
      'Cache-Control': 'no-store',
    }
  },
  define: {
  },
  envPrefix: ['VITE_'],
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'production' && VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Paris Elite Services',
        short_name: 'PES',
        description: 'Service de transport premium à Paris',
        theme_color: '#0B2545',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries - always needed
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }

          // Router - needed early
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }

          // Supabase - needed for data fetching
          if (id.includes('@supabase')) {
            return 'supabase';
          }

          // Heavy animation library - lazy load
          if (id.includes('framer-motion')) {
            return 'animations';
          }

          // Maps libraries - only for booking/excursions pages
          if (id.includes('@react-google-maps') || id.includes('mapbox-gl') || id.includes('@mapbox')) {
            return 'maps';
          }

          // Payment libraries - only for payment page
          if (id.includes('@stripe')) {
            return 'payment';
          }

          // Charts - only for admin/analytics
          if (id.includes('recharts')) {
            return 'charts';
          }

          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }

          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-radix';
          }

          // i18n libraries
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }

          // Date utilities
          if (id.includes('date-fns')) {
            return 'date-utils';
          }

          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@supabase/supabase-js',
      '@supabase/postgrest-js',
      '@supabase/gotrue-js',
      '@supabase/realtime-js'
    ],
    esbuildOptions: {
      target: 'esnext'
    }
  }
}));
