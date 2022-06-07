import logo from './logo.svg';
import './App.css';
import React from 'react';
// import Hideshow from './Hideshow';
import { ConfirmProvider } from 'material-ui-confirm';
import Layout from './components/Layout/Layout';
function App() {
   
  return (
    <ConfirmProvider>
      <div className="App">
        <Layout />
      </div>
    </ConfirmProvider>
  );
}

export default App;
