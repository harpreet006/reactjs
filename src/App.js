import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import Hideshow from './Hideshow';
function App() {
  const [count,setCount]= useState(5);
  const [secondCount , setSecondCount]= useState(1);
  const [status , setStatus]= useState(1);

  const hide=(sig)=>{
    setStatus(sig)
  }
  const show=(sig)=>{
    setStatus(sig)
  }

  useEffect(()=>{
    // hide()
  },[])
  return (
    <div className="App">
      {status && <Hideshow />}       
      <button onClick={()=>hide(0)}>Hide</button>
      <button onClick={()=>show(1)}>Show</button>
      
    </div>
  );
}

export default App;
