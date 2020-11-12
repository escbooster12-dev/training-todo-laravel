import React from "react";

import { logout } from "../services/auth";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import Header from "./Header";

import UpcomingTodos from "./todo/UpcomingTodos";
import OverduedTodos from "./todo/OverduedTodos";
import CompletedTodos from "./todo/CompletedTodos";

const Home = () => {
    const history = useHistory();

    const logoutOnClick = async params => {
        try {
            await logout();
            history.push("/");
        } catch (error) {
            alert("some error occured");
            console.log(error);
        }
    };

    return (
        <>
            <div className="container">
                <div
                    className="btn btn-danger float-right"
                    onClick={logoutOnClick}
                >
                    Logout
                </div>

                <br />
                <Header />

                <Switch>
                    <Route exact path="/todos" component={UpcomingTodos} />
                    <Route
                        exact
                        path="/todos/overdued"
                        component={OverduedTodos}
                    />
                    <Route
                        exact
                        path="/todos/completed"
                        component={CompletedTodos}
                    />
                </Switch>
            </div>
        </>
    );
};

export default Home;
