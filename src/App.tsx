import {  observer } from 'mobx-react-lite';
import './App.css'
import Dashboard from './components/dashboard';
import Header from './components/header'



const App = observer(() => {
  return (
    <>
    <Header/>
    <main>
      <Dashboard/>
    </main>
    </>
  );
})

export default App;
