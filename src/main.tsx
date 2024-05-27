import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootStore from './store';

const store = RootStore.create({});

export const StoreContext = createContext(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
