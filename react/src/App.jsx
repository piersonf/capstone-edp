import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import LoginForm from './components/LoginForm';
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./hooks/AuthContext";
import Search from "./components/Search";
import Employee from "./components/Employee";
import SalaryPrediction from "./components/SalaryPrediction";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            } />
          <Route path="/employee/:employee_id" element={
              <RequireAuth>
                <Employee />
              </RequireAuth>
            } />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/predict" element={
              <RequireAuth>
                <SalaryPrediction />
              </RequireAuth>
            } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App