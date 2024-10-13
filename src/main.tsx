import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootStore from './store/index-Store.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import { config } from './_providers/ant-desingn.ts';
import { ColorProvider } from './app/_providers/color-Context.tsx';
import { AppRouter } from './app/router/AppRouter.tsx';


const queryClient = new QueryClient();
const store = RootStore.create({});

export const StoreContext = createContext(store);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ColorProvider>
    <ConfigProvider theme={{ components: config}}>
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>
        <AppRouter/>
      </StoreContext.Provider>
    </QueryClientProvider>
    </ConfigProvider>
    </ColorProvider>
  </React.StrictMode>
);
