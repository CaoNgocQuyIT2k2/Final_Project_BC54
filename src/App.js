import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import LoginPage from './auth/LoginPage/LoginPage';
import HomeLayout from './layout/HomeLayout';
import RegisterPage from './auth/Register/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import Page404 from './Page404';

function App() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomeLayout /> : <Navigate to="/login" />}
          >
            <Route path="/home" element={<HomePage />} />
            
            {/* mẫu điền các route thay đường dẫn path (/detail-task) và component ở element ( <DetailTask /> ) */}
            
            {/* <Route
              path="/detail-task"
              element={user ? <DetailTask /> : <Navigate to="/login" />}
            /> */}


          </Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
