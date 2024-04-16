import { createContext, useState } from 'react';
import './App.css';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const myContext = createContext()
function App() {
  const [jwtToken, setJwtToken] = useState('')
  return (
    <>
      <myContext.Provider value={{ jwtToken, setJwtToken }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/employeelist' element={<EmployeeList />} />
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </>
  );
}

export default App;
