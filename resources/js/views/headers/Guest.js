import React, { useState } from "react";

import { Link } from "react-router-dom";

const GuestHeader = () => {
    const [link, setLink] = useState(window.location.pathname);

    return (
        <>
            <div className="ui inverted segment">
                <div className="ui inverted secondary menu">
                    <Link
                        className={`item ${link === "/" ? "active" : ""}`}
                        onClick={() => setLink("/")}
                        to="/"
                    >
                        Todo
                    </Link>
                    <Link
                        className={`item ${
                            link === "/register" ? "active" : ""
                        }`}
                        onClick={() => setLink("/register")}
                        to="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default GuestHeader;
