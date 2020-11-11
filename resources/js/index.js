import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import { Container, Header, Navbar } from "rsuite";

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
                    <Route exact path="/register" component={Register} />
                    <Route component={Login} />
                </Switch>
            </Container>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
