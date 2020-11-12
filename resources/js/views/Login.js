import React, { useState } from "react";

import Alert from "./components/Alert";
import {
    Content,
    FlexboxGrid,
    Panel,
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
    Button,
    ButtonToolbar
} from "rsuite";

import { useHistory } from "react-router-dom";
import { login } from "../services/auth";
import { isEmpty } from "lodash";

const Login = params => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);

    const history = useHistory();

    const loginOnSubmit = async event => {
        event.preventDefault();

        if (isEmpty(email) || isEmpty(password)) {
            return false;
        }

        try {
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            await login(formData);
            window.location.href = "/home";
        } catch ({ response }) {
            switch (response.status) {
                case 422:
                    var errors = response.data.errors;
                    setAlert(errors[Object.keys(errors)[0]][0]);
                    break;
                case 429:
                    setAlert("Too many request error");
                    break;
                case 403:
                    setAlert("The email and password does not match.");
            }
        }
    };

    return (
        <div className="ui centered grid container">
            <div className="nine wide column">
                <Alert header="Login Error" error={alert} />

                <div className="ui fluid card">
                    <div className="content">
                        <div className="header">Login</div>
                    </div>
                    <div className="content">
                        <form className="ui form" onSubmit={loginOnSubmit}>
                            <div className="field">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="ui primary button"
                                onClick={loginOnSubmit}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
