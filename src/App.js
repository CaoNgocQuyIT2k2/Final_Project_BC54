import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import LoginPage from './auth/LoginPage/LoginPage';
import HomeLayout from './layout/HomeLayout';
import RegisterPage from './auth/Register/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import Page404 from './Page404';
import UpdateTask from './pages/TaskPage/UpdateTask';
import Admin from './pages/Admin/Admin';
import Jira from './pages/Jira/Jira';
import TaskDetail from './pages/Jira/TaskDetail';
import TaskInfo from './pages/Jira/TaskInfo';
import TaskListComment from './pages/Jira/TaskListComment';
import ViewAllUser from "./pages/HomePage/ViewAllUser";


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
            <Route path="/all_User" element={<ViewAllUser />} />
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
          <Route path="/ctask" element={<UpdateTask />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/jira" element={<Jira />} />
          <Route path="/taskdetail" element={<TaskDetail />} />

            
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
