import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootStore from './store/index-Store.ts';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Button, Result } from 'antd';

const store = RootStore.create({});
const router = createBrowserRouter([
  {
  path: '/vite-project/',
  element: <App />,
  errorElement: <Result
  status="404"
  title="404"
  subTitle="Sorry, the page you visited does not exist."
  extra={<Button type="primary" href='/vite-project/' >Back Home</Button>}
/>
  },
]);
export const StoreContext = createContext(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
