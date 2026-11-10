import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base relativa: o site funciona tanto em goncalofilipe.github.io/site-pessoal/ como na raiz de um domínio
export default defineConfig({
  base: './',
  plugins: [react()],
})
