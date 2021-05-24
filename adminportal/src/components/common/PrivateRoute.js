import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { InfoContext } from "../../context/authContext";

/**
It makes the routes autheticated by checking the context data and further validating state.
Also to make guest links i.e. login which can't be accessed by logged in user.
 */

const PrivateRoute = props => {
    const {info, setInfo} = useContext(InfoContext);
    const { type } = props;
    if (type === "guest" && info.isLoggedIn) return <Redirect to="/" />;
    else if (type === "private" && !info.isLoggedIn) return <Redirect to="/login" />;

    return <Route {...props} />;
};


export default PrivateRoute;
