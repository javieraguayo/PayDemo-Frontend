import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import FailurePage from './pages/FailurePage';
import SuccessPage from './pages/SuccessPage';
import HistoryPage from './pages/HistoryPage';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;