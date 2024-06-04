import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vite-project/",
  plugins: [react()],
})


  //http://localhost:5000/users
  //http://localhost:5000/boards
  //http://localhost:5000/me
  //http://localhost:5000/board_main_tasks
  //http://localhost:5000/board_development_tasks