import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-project/",
  plugins: [react()],
})


  //http://localhost:3001/users
  //http://localhost:3001/boards
  //http://localhost:3001/me
  //http://localhost:3001/board_main_tasks
  //http://localhost:3001/board_development_tasks