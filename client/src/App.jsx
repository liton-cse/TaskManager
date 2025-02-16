import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Header from "./components/Header";
import Register from "./pages/auth/Register";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Task from "./pages/profile/Tasks"
import ProtectedRoute from "./Protector/ProtectedRoute";
import TaskForm from "./pages/tasks/TaskForm";
import Users from "./pages/profile/Users";



function App() {
  return (
    <div>
      <header> <Header /></header>
      <main style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
          <Route path="/tasks" element={<ProtectedRoute>
            <Task/>
          </ProtectedRoute>}/>
          <Route path="/" element={<ProtectedRoute>
            <Task />
          </ProtectedRoute>} />

          <Route path="/users" element={<ProtectedRoute>
            <Users/>
          </ProtectedRoute>}/>

          <Route path="/tasks/new" element={<TaskForm/>}/>
          <Route path="/tasks/edit/:id" element={<TaskForm/>}/>
          <Route path="/users/edit/:id" element={<Register/>}/>
          
        </Routes>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
