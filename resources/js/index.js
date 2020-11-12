import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

import { Container, Header, Navbar } from "rsuite";
import { isAuthenticated } from "./services/auth";

ReactDOM.render(
    <BrowserRouter>
        <div>
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
                        isAuthenticated() ? <Redirect to="/todos" /> : <Register />
                    )}/>
                    <Route path="/todos" render={(props) => (
                        isAuthenticated() ? <Home /> : <Redirect to="/" />
                    )}/>
                    <Route exact render={(props) => (
                        isAuthenticated() ? <Redirect to="/todos" /> : <Login />
                    )}/>
                </Switch>
            </Container>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
