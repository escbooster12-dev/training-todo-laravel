import React, { useState } from "react";

import { Link } from "react-router-dom";

const AuthHeader = () => {
    const [link, setLink] = useState(window.location.pathname);

    return (
        <>
            <div className="ui pointing secondary menu">
                <Link
                    className={`item ${link === "/" ? "active" : ""}`}
                    onClick={() => setLink("/")}
                    to="/todos"
                >
                    Upcoming
                </Link>
                <Link
                    className={`item ${
                        link === "/todos/overdued" ? "active" : ""
                    }`}
                    onClick={() => setLink("/todos/overdued")}
                    to="/todos/overdued"
                >
                    Overdued
                </Link>
                <Link
                    className={`item ${
                        link === "/todos/completed" ? "active" : ""
                    }`}
                    onClick={() => setLink("/todos/completed")}
                    to="/todos/completed"
                >
                    Completed
                </Link>
            </div>
        </>
    );
};

export default AuthHeader;
