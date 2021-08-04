import Topbar from "./components/Topbar/Topbar";
import Homepage from "./pages/Homepage/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
  const currentUser = true;
  const test = false;
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/register">
          {test ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{test ? <Homepage /> : <Login />}</Route>
        <Route path="/write">{currentUser ? <Write /> : <Homepage />}</Route>
        <Route path="/settings">
          {currentUser ? <Settings /> : <Homepage />}
        </Route>
      </Switch>      
    </Router>
  );
}

export default App;