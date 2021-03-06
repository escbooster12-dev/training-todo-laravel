import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

import { isAuthenticated } from "./services/auth";

import AuthHeader from "./views/headers/Auth";
import GuestHeader from "./views/headers/Guest";

ReactDOM.render(
    <BrowserRouter>
        {isAuthenticated() ? <AuthHeader /> : <GuestHeader />}

        <div className="container ui">
            <Switch>
                <Route
                    exact
                    path="/register"
                    render={props =>
                        isAuthenticated() ? (
                            <Redirect to="/todos" />
                        ) : (
                            <Register />
                        )
                    }
                />
                <Route
                    path="/todos"
                    render={props =>
                        isAuthenticated() ? <Home /> : <Redirect to="/" />
                    }
                />
                <Route
                    exact
                    render={props =>
                        isAuthenticated() ? <Redirect to="/todos" /> : <Login />
                    }
                />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById("app")
);
