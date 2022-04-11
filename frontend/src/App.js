import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/Messenger/Messenger";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/messenger/:id" component={Messenger} />
    </Router>
  );
}

export default App;
