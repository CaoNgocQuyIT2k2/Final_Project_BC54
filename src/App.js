
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './auth/LoginPage/LoginPage';
import HomeLayout from './layout/HomeLayout';
import RegisterPage from './auth/Register/RegisterPage';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
      <Route path="/" element= {<HomeLayout/>}/> 
      <Route path="/login" element= {<LoginPage/>}/> 
      <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
