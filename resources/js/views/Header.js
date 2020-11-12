import React, { useState } from "react";

import { Link } from "react-router-dom";

const Header = () => {
    const [link, setLink] = useState("/");

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

export default Header;
