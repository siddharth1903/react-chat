import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  console.log("the mode is" + mode);
  return {
    ...mode === 'production' ? { base: '/react-chat' } : {},
    plugins: [react()],
  }
})
