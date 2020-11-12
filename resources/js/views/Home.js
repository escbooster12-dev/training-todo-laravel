import React from "react";

import { Switch, Route } from "react-router-dom";
import TodoHeader from "./todo/Header";
import InfiniteScrollTodos from "./todo/InfiniteScrollTodos";

const Home = () => {
    return (
        <>
            <div className="container">
                <TodoHeader />

                <Switch>
                    <Route
                        exact
                        path="/todos"
                        render={() => (
                            <InfiniteScrollTodos
                                key="upcoming"
                                api="todo?overdued=false&completed=false"
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/todos/overdued"
                        render={() => (
                            <InfiniteScrollTodos
                                key="overdued"
                                api="todo?overdued=true&completed=false"
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/todos/completed"
                        render={() => (
                            <InfiniteScrollTodos
                                key="completed"
                                api="todo?completed=true"
                            />
                        )}
                    />
                </Switch>
            </div>
        </>
    );
};

export default Home;
