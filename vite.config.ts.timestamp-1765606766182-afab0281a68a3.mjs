// vite.config.ts
import { defineConfig } from "file:///C:/Users/paris/Desktop/paris-luxe-journey-NUEVO/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/paris/Desktop/paris-luxe-journey-NUEVO/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/paris/Desktop/paris-luxe-journey-NUEVO/node_modules/lovable-tagger/dist/index.js";
import { VitePWA } from "file:///C:/Users/paris/Desktop/paris-luxe-journey-NUEVO/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\paris\\Desktop\\paris-luxe-journey-NUEVO";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 8080,
      clientPort: 8080,
      timeout: 5e3
    },
    watch: {
      usePolling: true,
      interval: 1e3
    },
    headers: {
      "Cache-Control": "no-store"
    }
  },
  define: {},
  envPrefix: ["VITE_"],
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Paris Elite Services",
        short_name: "PES",
        description: "Service de transport premium \xE0 Paris",
        theme_color: "#0B2545",
        background_color: "#ffffff",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "esnext",
    minify: "terser",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/react-router-dom")) {
            return "vendor-router";
          }
          if (id.includes("@supabase")) {
            return "supabase";
          }
          if (id.includes("framer-motion")) {
            return "animations";
          }
          if (id.includes("@react-google-maps") || id.includes("mapbox-gl") || id.includes("@mapbox")) {
            return "maps";
          }
          if (id.includes("@stripe")) {
            return "payment";
          }
          if (id.includes("recharts")) {
            return "charts";
          }
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
            return "forms";
          }
          if (id.includes("@radix-ui")) {
            return "ui-radix";
          }
          if (id.includes("i18next") || id.includes("react-i18next")) {
            return "i18n";
          }
          if (id.includes("date-fns")) {
            return "date-utils";
          }
          if (id.includes("node_modules")) {
            return "vendor-misc";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    },
    chunkSizeWarningLimit: 1e3,
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
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
      "@supabase/postgrest-js",
      "@supabase/gotrue-js",
      "@supabase/realtime-js"
    ],
    esbuildOptions: {
      target: "esnext"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwYXJpc1xcXFxEZXNrdG9wXFxcXHBhcmlzLWx1eGUtam91cm5leS1OVUVWT1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGFyaXNcXFxcRGVza3RvcFxcXFxwYXJpcy1sdXhlLWpvdXJuZXktTlVFVk9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BhcmlzL0Rlc2t0b3AvcGFyaXMtbHV4ZS1qb3VybmV5LU5VRVZPL3ZpdGUuY29uZmlnLnRzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiB0cnVlLCBcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBobXI6IHtcclxuICAgICAgcHJvdG9jb2w6ICd3cycsXHJcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgICBjbGllbnRQb3J0OiA4MDgwLFxyXG4gICAgICB0aW1lb3V0OiA1MDAwXHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDEwMDAsXHJcbiAgICB9LFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ2FjaGUtQ29udHJvbCc6ICduby1zdG9yZScsXHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICB9LFxyXG4gIGVudlByZWZpeDogWydWSVRFXyddLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmXHJcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdyb2JvdHMudHh0JywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ1BhcmlzIEVsaXRlIFNlcnZpY2VzJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnUEVTJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NlcnZpY2UgZGUgdHJhbnNwb3J0IHByZW1pdW0gXHUwMEUwIFBhcmlzJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwQjI1NDUnLFxyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcvaWNvbi0xOTJ4MTkyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcvaWNvbi01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIGNzc01pbmlmeTogdHJ1ZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIC8vIENvcmUgUmVhY3QgbGlicmFyaWVzIC0gYWx3YXlzIG5lZWRlZFxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QnKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWRvbScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXJlYWN0JztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSb3V0ZXIgLSBuZWVkZWQgZWFybHlcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1yb3V0ZXInO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFN1cGFiYXNlIC0gbmVlZGVkIGZvciBkYXRhIGZldGNoaW5nXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0BzdXBhYmFzZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnc3VwYWJhc2UnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhlYXZ5IGFuaW1hdGlvbiBsaWJyYXJ5IC0gbGF6eSBsb2FkXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2ZyYW1lci1tb3Rpb24nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2FuaW1hdGlvbnMnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE1hcHMgbGlicmFyaWVzIC0gb25seSBmb3IgYm9va2luZy9leGN1cnNpb25zIHBhZ2VzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByZWFjdC1nb29nbGUtbWFwcycpIHx8IGlkLmluY2x1ZGVzKCdtYXBib3gtZ2wnKSB8fCBpZC5pbmNsdWRlcygnQG1hcGJveCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbWFwcyc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUGF5bWVudCBsaWJyYXJpZXMgLSBvbmx5IGZvciBwYXltZW50IHBhZ2VcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHN0cmlwZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncGF5bWVudCc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ2hhcnRzIC0gb25seSBmb3IgYWRtaW4vYW5hbHl0aWNzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlY2hhcnRzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdjaGFydHMnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEZvcm0gbGlicmFyaWVzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWhvb2stZm9ybScpIHx8IGlkLmluY2x1ZGVzKCdAaG9va2Zvcm0nKSB8fCBpZC5pbmNsdWRlcygnem9kJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdmb3Jtcyc7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUmFkaXggVUkgY29tcG9uZW50c1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAcmFkaXgtdWknKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3VpLXJhZGl4JztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBpMThuIGxpYnJhcmllc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdpMThuZXh0JykgfHwgaWQuaW5jbHVkZXMoJ3JlYWN0LWkxOG5leHQnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2kxOG4nO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERhdGUgdXRpbGl0aWVzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2RhdGUtZm5zJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdkYXRlLXV0aWxzJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBPdGhlciB2ZW5kb3IgbGlicmFyaWVzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yLW1pc2MnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSdcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc291cmNlbWFwOiBmYWxzZVxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICdyZWFjdCcsIFxyXG4gICAgICAncmVhY3QtZG9tJywgXHJcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcclxuICAgICAgJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcycsXHJcbiAgICAgICdAc3VwYWJhc2UvcG9zdGdyZXN0LWpzJyxcclxuICAgICAgJ0BzdXBhYmFzZS9nb3RydWUtanMnLFxyXG4gICAgICAnQHN1cGFiYXNlL3JlYWx0aW1lLWpzJ1xyXG4gICAgXSxcclxuICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgIHRhcmdldDogJ2VzbmV4dCdcclxuICAgIH1cclxuICB9XHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxlQUFlO0FBTHhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVEsQ0FDUjtBQUFBLEVBQ0EsV0FBVyxDQUFDLE9BQU87QUFBQSxFQUNuQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlC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
