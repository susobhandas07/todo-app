import { useState } from 'react'
import Header from './header';
import Body from './body';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default App
