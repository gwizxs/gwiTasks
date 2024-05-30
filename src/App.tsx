import { Observer } from 'mobx-react-lite';
import './App.css'
import Dashboard from './components/dashboard';
import Header from './components/header'



function App() {
  return (
    <>
    <Header/>
    <main>
      <Dashboard/>
    </main>
    </>
  )
}

export default Observer(App);
