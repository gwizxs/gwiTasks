import {  observer } from 'mobx-react-lite';
import './App.css'
import Dashboard from './components/dashboard';
import Header from './components/header'



const App = () => {
  return (
    <>
    <Header/>
    <main>
      <Dashboard/>
    </main>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
