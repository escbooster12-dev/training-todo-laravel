import React from "react";

import { Switch, Route } from "react-router-dom";

import TodoHeader from "./todo/Header";

import UpcomingTodos from "./todo/UpcomingTodos";
import OverduedTodos from "./todo/OverduedTodos";
import CompletedTodos from "./todo/CompletedTodos";

const Home = () => {
    return (
        <>
            <div className="container">

                <TodoHeader />

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
