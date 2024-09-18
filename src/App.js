import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import FailurePage from './pages/FailurePage';
import SuccessPage from './pages/SuccessPage';
import HistoryPage from './pages/HistoryPage';
import ErrorPage from './components/ErrorPage';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/history/:id" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;