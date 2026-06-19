import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Carga los shaders (.vs, .fs, .glsl) como cadenas de texto crudas.
function rawShaders(): Plugin {
  return {
    name: 'raw-shaders',
    enforce: 'pre',
    transform(code, id) {
      if (/\.(vs|fs|glsl)$/.test(id.split('?')[0])) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null,
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [rawShaders(), react()],
})
