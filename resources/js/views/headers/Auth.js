import React, { useState } from "react";

import { logout } from "../../services/auth";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    const [link, setLink] = useState(window.location.pathname);

    const logoutOnClick = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (error) {
            alert("some error occured");
            console.log(error);
        }
    };

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
                    <div className="right menu">
                        <div className="ui button red" onClick={logoutOnClick}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthHeader;
