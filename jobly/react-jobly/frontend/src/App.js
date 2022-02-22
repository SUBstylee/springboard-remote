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
import CompanyDetails from './pages/company-details/company-details.component';
import LoadingSpinner from './components/loading-spinner/loading-spinner.component';
import JoblyApi from './api';
import jwt from 'jsonwebtoken';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './UserContext';

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(() => {
    /** will refresh in local storage and user context */
    async function getUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          // username from jwt
          let { username } = jwt.decode(token);
          let currentUser = await JoblyApi.getUser(username);
          setUser(currentUser);
        } catch (e) {
          console.error(e.message);
          setUser(null);
        };
      } else {
        // user set to null if no token
        setUser(null);
      };
      setIsLoading(false);
    };
    setIsLoading(true);
    getUser();
  }, [token]);

  const signup = async (newUser) => {
    try {
      // add new user and login to account
      const userToken = await JoblyApi.signup(newUser);
      // trigger useEffect
      setToken(userToken);
      setErrorMessage(null);
      return { success: true }
    } catch (e) {
      setToken(null);
      setErrorMessage({ type: 'signup', message: e });
      console.log('Create user error:', e);
    }
  };

  const changeInfo = async (existingUser) => {
    try {
      // check that password is correct
      const loginSuccess = await login({
        username: user.username,
        password: existingUser.password,
      });
      if (!loginSuccess) {
        return;
      }
      // update user data using PATCH
      const updatedUser = await JoblyApi.changeInfo(
        user.username,
        existingUser
      );
      setUser(updatedUser);
      setErrorMessage(null);
      return true;
    } catch (e) {
      setErrorMessage({ type: 'update', message: e });
      console.log('Update error:', e);
      return false;
    }
  };

  const login = async (loginData) => {
    try {
      // Login user via api and get token that is returned from POST request
      const userToken = await JoblyApi.login(loginData);
      // Set token to trigger useEffect
      setToken(userToken);
      setErrorMessage(null);
      return true;
    } catch (e) {
      setToken(null);
      setErrorMessage({ type: 'login', message: e });
      console.log('Login error:', e);
      return false;
    }
  };

  const logout = () => {
    try {
      setToken(null);
    } catch (e) {
      setToken(null);
      console.log('Logout error:', e);
    }
  };

  const applyToJob = async (user, jobId) => {
    try {
      // Link user to a job posting based on username and jobId
      await JoblyApi.applyToJob(user.username, jobId);
      // clear previous errors
      setErrorMessage(null);

      setUser({ ...user, applications: [...user.applications, jobId] });
      // return true for successful update
      return true;
    } catch (e) {
      setErrorMessage({ type: 'job', message: e });
      console.log('Apply user to job error:', e);
      // return false for unsuccessful update
      return false;
    }
  };


  // if (!isLoading) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={{ user }}>
      <div className="App">
        <Header logout={logout} />
        {isLoading ? (<LoadingSpinner />) :
          (
            <Switch>
              <Route exact path='/'>
                <HomePage logout={logout} />
              </Route>
              <Route exact path='/companies' component={Companies} />
              <Route exact path='/companies/:handle'>
                <CompanyDetails errorMessage={errorMessage} applyToJob={applyToJob} />
              </Route>
              <Route exact path='/jobs'>
                <Jobs errorMessage={errorMessage} applyToJob={applyToJob} />
              </Route>
              <Route exact path='/applications' component={Applied} />
              <Route exact path='/signup'>
                <Signup signup={signup} errorMessage={errorMessage} />
              </Route>
              <Route exact path='/login'>
                <Login login={login} errorMessage={errorMessage} />
              </Route>
              <Route exact path='/profile'>
                <Profile changeInfo={changeInfo} errorMessage={errorMessage} />
              </Route>
              <Route component={NotFound} />
            </Switch>
          )
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
