import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Companies from './pages/companies/companies.component';
import Jobs from './pages/jobs/jobs.component';
import Applied from './pages/applied/applied.component';
import Profile from './pages/profile/profile.component';
import Signup from './pages/signup/signup.component';
import Login from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import JoblyApi from './api';
// import jwt from 'jsonwebtoken';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  // const [token, setToken] = useLocalStorage('tokenKey');
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/companies' component={Companies} />
        <Route exact path='/jobs' component={Jobs} />
        <Route exact path='/applications' component={Applied} />
        <Route exact path='/logout' component={HomePage} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
