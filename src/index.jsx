import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';

const root = createRoot(document.getElementById('root'));
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} />
      <Route path="/result" element={isAuthenticated ? <Result /> : <Navigate to="/" />} />
    </Routes>
  </Router>
);