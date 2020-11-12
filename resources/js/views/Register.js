import React, { useState } from "react";

import Alert from "./components/Alert";
import { register } from "../services/auth";
import { useHistory } from "react-router-dom";

const Register = params => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [alert, setAlert] = useState(null);

    const history = useHistory();

    const registerOnSubmit = async event => {
        event.preventDefault();

        if (!email || !password || !passwordConfirmation) {
            return false;
        }

        try {
            let formData = new FormData();
            formData.append("name", email);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("password_confirmation", passwordConfirmation);

            await register(formData);
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
                <Alert header="Register Error" error={alert} />

                <div className="ui fluid card">
                    <div className="content">
                        <div className="header">Register</div>
                    </div>
                    <div className="content">
                        <form className="ui form" onSubmit={registerOnSubmit}>
                            <div className="field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
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
                            <div className="field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={e =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="ui primary button"
                                onClick={registerOnSubmit}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
