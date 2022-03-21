import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
function App() {
  return (
    <Router >

  <Route exact path='/' component={Home}/>
  <Route exact path='/login' component={Login}/>
  <Route exact path='/register' component={Register}/>
  <Route exact path='/profile/:id' component={Profile}/>
  </Router>
  );
}

export default App;
