import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { Container, Header, Navbar } from "rsuite";
import { isAuthenticated } from "./services/auth";

ReactDOM.render(
    <BrowserRouter>
        <div>
            {/* <nav className="container">
        <ul className="nav mt-2 mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      </nav> */}

            <Container>
                <Header className="mb-5">
                    <Navbar appearance="inverse">
                        <Navbar.Header>
                            <a className="navbar-brand logo">Brand</a>
                        </Navbar.Header>
                    </Navbar>
                </Header>
                <Switch>
                    <Route exact path="/register" render={(props) => (
                        !isAuthenticated() ? <Register /> : <Redirect to="/home" />
                    )}/>
                    <Route exact path="/home" render={(props) => (
                        isAuthenticated() ? <Home /> : <Redirect to="/" />
                    )}/>
                    <Route component={Login} />
                </Switch>
            </Container>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
