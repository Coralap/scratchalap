import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  base: './', // מוודא שהנתיבים ללוגו ולאייקונים יהיו יחסיים
  plugins: [
    electron({
      entry: 'electron/main.js',
    }),
    renderer(),
  ],
  build: {
    outDir: 'dist', // תיקיית הפלט הסטנדרטית של ה-Sigma
    emptyOutDir: true,
  }
})