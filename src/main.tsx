import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootStore from './store/index-Store.ts';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Me from './pages/Me/index.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Team from './pages/Team/Team.tsx';
import About from './pages/About/index.tsx';
import Setting from './pages/Setting/index.tsx';

const store = RootStore.create({});
const router = createBrowserRouter([
  {
  path: '/vite-project/',
  element: <App />,
  errorElement: <ErrorPage />
  },
  {
    path: '/vite-project/Me',
    element: <Me />,
    errorElement: <ErrorPage />
  },
  {
    path: '/vite-project/Team',
    element: <Team/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/vite-project/About',
    element: <About/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/vite-project/Setting',
    element: <Setting/>,
    errorElement: <ErrorPage/>
  }
]);

export const StoreContext = createContext(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
