import React from 'react'
import './App.css'
import UseStore from './hooks/useStore'

function App() {
  const {users} = UseStore();

  console.log(users);

  return (
<div>
  123
  qertyhj
</div>
  )
}

export default App
