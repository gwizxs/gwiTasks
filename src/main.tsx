import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RootStore from './store/index-Store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Me from './pages/Me/index.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import TimeBlocking from './pages/About/TimeBlocking.tsx';
import Auth from './pages/auth/index.tsx';
import { DASHBOARD_PAGES } from './config/pages-url.config.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import { config } from './_providers/ant-desingn.ts';
import { ColorProvider } from './_providers/color-Context.tsx';
import Customize from './pages/Customize/index.tsx'


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
    element: <Auth />,
    errorElement: <ErrorPage />
  },
  {
    path: DASHBOARD_PAGES.ME,
    element: <Me />,
    errorElement: <ErrorPage />
  },
  {
    path: DASHBOARD_PAGES.TIME_BLOCKING,
    element: <TimeBlocking />,
    errorElement: <ErrorPage />
  },
  {
    path: DASHBOARD_PAGES.CUSTOMIZE,
    element: <Customize />,
    errorElement: <ErrorPage />
  },
]);

export const StoreContext = createContext(store);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ColorProvider>
    <ConfigProvider theme={{ components: config}}>
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </QueryClientProvider>
    </ConfigProvider>
    </ColorProvider>
  </React.StrictMode>
);
