
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
        name: 'Paris Luxe Journey',
        short_name: 'PLJ',
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

          // React ecosystem — all packages that import React must share this chunk.
          // Prevents circular vendor-misc↔vendor-react createContext crash.
          // Broad node_modules/react match covers: react, react-dom, react-router-dom,
          // react-i18next, react-hook-form, react-day-picker, react-helmet-async, etc.
          // @remix-run: react-router-dom peer dep.
          // @floating-ui: Radix UI peer dep, imports React.
          // @tanstack/react-*: uses createContext, path doesn't match node_modules/react.
          // next-themes, sonner, lucide-react, framer-motion, @radix-ui, cmdk, vaul,
          // embla-carousel, input-otp all call React.createContext — must not land in vendor-misc.
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/scheduler') ||        // react-dom peer dep
            id.includes('node_modules/prop-types') ||       // React companion, imports react-is
            id.includes('node_modules/hoist-non-react-statics') ||
            id.includes('@remix-run') ||
            id.includes('@radix-ui') ||
            id.includes('@floating-ui') ||
            id.includes('@tanstack/') ||
            id.includes('node_modules/next-themes') ||
            id.includes('node_modules/sonner') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/cmdk') ||
            id.includes('node_modules/vaul') ||
            id.includes('node_modules/embla-carousel') ||
            id.includes('node_modules/input-otp')
          ) {
            return 'vendor-react';
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
