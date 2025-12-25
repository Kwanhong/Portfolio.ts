import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@objects': path.resolve(__dirname, 'src/objects'),
      '@styles': path.resolve(__dirname, 'src/ui/styles'),
      '@data': path.resolve(__dirname, 'src/data'),
    },
  },
})