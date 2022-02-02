import { Route, Switch } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import Companies from './pages/companies/companies.component';
import Jobs from './pages/jobs/jobs.component';
import Applied from './pages/applied/applied.component';
import Logout from './pages/logout/logout.component';
import Signup from './pages/signup/signup.component';
import Login from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
function App() {
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
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
