import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootStore from './store/index-Store.ts';

const store = RootStore.create({
  users: {},
  boards: {},
});

export const StoreContext = createContext(store)


const fetchData = async () => {
  try {
    const response = await fetch('./dataBase/index.json');
    const data = await response.json();

    // Обновление данных
    store.users = data.users;
    store.boards = data.boards;
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};

// Загрузка данных
fetchData().then(() => {


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
});
