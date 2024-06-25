import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootStore from './store/index-Store.ts';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Me from './pages/Me/index.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import TimeBlocking from './pages/About/TimeBlocking.tsx';
import Setting from './pages/Setting/index.tsx';
import Auth from './pages/auth/index.tsx';
import {DASHBOARD_PAGES }from './config/pages-url.config.ts';
import{ QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient();
const store = RootStore.create({});
const router = createBrowserRouter([
  {
  path: DASHBOARD_PAGES.HOME,
  element: <App />,
  errorElement: <ErrorPage />
  },
  {
    path: DASHBOARD_PAGES.AUTH,
    element: <Auth/>,
    errorElement: <ErrorPage/>
  },
  {
    path: DASHBOARD_PAGES.ME,
    element: <Me />,
    errorElement: <ErrorPage />
  },
  {
    path: DASHBOARD_PAGES.TIME_BLOCKING,
    element: <TimeBlocking/>,
    errorElement: <ErrorPage/>
  },
  {
    path: DASHBOARD_PAGES.SETTINGS,
    element: <Setting/>,
    errorElement: <ErrorPage/>
  },
]);

export const StoreContext = createContext(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StoreContext.Provider value={store}>
          <RouterProvider router={router} />
        </StoreContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );