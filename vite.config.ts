
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: '127.0.0.1',
    port: 8082,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 8082,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
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
          // Supabase
          if (id.includes('@supabase')) return 'supabase';

          // Payment
          if (id.includes('@stripe')) return 'payment';

          // Charts
          if (id.includes('recharts')) return 'charts';

          // Maps
          if (id.includes('@react-google-maps') || id.includes('mapbox-gl') || id.includes('@mapbox')) return 'maps';

          // Date utilities (pure JS, no React)
          if (id.includes('node_modules/date-fns')) return 'date-utils';

          // i18n core (pure JS — react-i18next is caught by the react block below)
          if (id.includes('node_modules/i18next')) return 'i18n';

          // Form validators (pure JS)
          if (id.includes('@hookform') || id.includes('node_modules/zod')) return 'forms';

          // Keep React core in one base chunk.
          // Other React ecosystem chunks may depend on this chunk,
          // but React core must not depend back on them.
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('node_modules/prop-types/') ||
            id.includes('node_modules/hoist-non-react-statics/')
          ) {
            return 'vendor-react';
          }

          // Router stack — isolated from UI libs to keep chunk graph acyclic.
          if (
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('@remix-run/')
          ) {
            return 'router';
          }

          // UI ecosystem that depends on React core.
          if (
            id.includes('@radix-ui') ||
            id.includes('@floating-ui') ||
            id.includes('node_modules/next-themes') ||
            id.includes('node_modules/sonner') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/cmdk') ||
            id.includes('node_modules/vaul') ||
            id.includes('node_modules/embla-carousel') ||
            id.includes('node_modules/input-otp')
          ) {
            return 'ui-react';
          }

          // Animation library — large enough to isolate safely.
          if (id.includes('node_modules/framer-motion')) {
            return 'motion';
          }

          // React state/query layer.
          if (id.includes('@tanstack/')) {
            return 'query';
          }

          // React form/view helpers that are not part of React core.
          if (
            id.includes('node_modules/react-hook-form/') ||
            id.includes('node_modules/react-day-picker/') ||
            id.includes('node_modules/react-helmet-async/') ||
            id.includes('node_modules/react-i18next/')
          ) {
            return 'react-libs';
          }

          // Remaining node_modules — let Rollup auto-chunk to avoid any further circulars
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
