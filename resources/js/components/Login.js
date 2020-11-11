import React from "react";

import "rsuite/dist/styles/rsuite-default.css";
import {
    Container,
    Header,
    Navbar,
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

const Login = params => {
    const history = useHistory();
    
    const loginOnClick = async (params) => {
        // history.push("/register");
    }

    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3>Login</h3>} bordered>
                        <Form fluid>
                            <FormGroup>
                                <ControlLabel>
                                    Username or email address
                                </ControlLabel>
                                <FormControl name="name" />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl name="password" type="password" />
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button onClick={loginOnClick} appearance="primary">
                                        Sign in
                                    </Button>
                                    <Button appearance="link">
                                        Forgot password?
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
