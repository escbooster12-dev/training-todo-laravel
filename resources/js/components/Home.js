import React from "react";

import { Button } from "rsuite";
import { logout } from '../services/auth';
import { useHistory } from "react-router-dom";

const Home = params => {
    const history = useHistory();

    const logoutOnClick = async (params) => {
        try {
            const response = await logout();
            history.push("/");
        } catch (error) {
            alert('some error occured');
            console.log(error)
        }
    }
    

    return (
        <>
            <Button color="red" onClick={logoutOnClick}>Logout</Button>
        </>
    );
};

export default Home;
