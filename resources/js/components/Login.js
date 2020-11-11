import React, { useState } from "react";

import "rsuite/dist/styles/rsuite-default.css";
import {
    Alert,
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

const Login = params => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const loginOnSubmit = async event => {
        event.preventDefault();

        try {
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const response = await login(formData);
            history.push("/home");
        } catch ({ response }) {
            var error = "some error occured";

            switch (response.status) {
                case 422:
                    var errors = response.data.errors;
                    error = errors[Object.keys(errors)[0]][0];
                    break;
                case 429:
                    error = "Too many request error";
                    break;
                case 403:
                    error = "The email and password does not match.";
            }

            Alert.error(error, 5000);
        }
    };

    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3>Login</h3>} bordered>
                        <Form fluid onSubmit={loginOnSubmit}>
                            <FormGroup>
                                <ControlLabel>Email address</ControlLabel>
                                <FormControl
                                    value={email}
                                    onInput={e => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={password}
                                    onInput={e => setPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button
                                        onClick={loginOnSubmit}
                                        appearance="primary"
                                    >
                                        Sign in
                                    </Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    );
};

export default Login;
