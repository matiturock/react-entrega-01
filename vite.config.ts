import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // Opciones del compilador (opcional)
            runtimeModule: 'react-compiler-runtime',
          }]
        ],
      },
    }),
  ],
})