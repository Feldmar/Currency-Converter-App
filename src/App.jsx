import React from 'react';
import './App.css';
import Header from './components/header/header';
import AppRouting from './components/routing/routing';
import { useState, createContext, useEffect } from 'react';
import getData from './components/api/api-axos-response'

export const CONTEXT_NAME = 'my-context';
export const Context = createContext(CONTEXT_NAME);

function App() {
  const [baseCurency, setBaseCurency] = useState('');
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    getData(baseCurency).then((result) => {
      setCurrencies(result.rates);
    });

    if (!baseCurency) {
      const newValue1 = localStorage.getItem('baseValute');
      if (newValue1) {
        setBaseCurency(newValue1);
      }
    } else {
      localStorage.setItem('baseValute', baseCurency);
    }

    

  }, [baseCurency]);

  return (
    <div className="wrapper main">
      <Context.Provider value={{ baseCurency, setBaseCurency, currencies, setCurrencies }} >
        <Header baseCurency={baseCurency} setBaseCurency={setBaseCurency} currencies={currencies} setCurrencies={setCurrencies} />
        <AppRouting/>
      </Context.Provider>
    </div>
  );
}
export default App;
