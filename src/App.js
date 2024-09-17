import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import FailurePage from './pages/FailurePage';
import SuccessPage from './pages/SuccessPage';
import HistoryPage from './pages/HistoryPage';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PaymentPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/failure" component={FailurePage} />
        <Route path="/history" exact component={HistoryPage} />
        <Route path="/history/:id" component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;