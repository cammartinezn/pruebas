import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";

import { AuthContext } from "./Auth";

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("tokens") || ""
  );
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  console.log("authTokens", authTokens);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    setAuthTokens("");
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {authTokens ? (
                <Link onClick={handleLogout}> Logout </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>

          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
