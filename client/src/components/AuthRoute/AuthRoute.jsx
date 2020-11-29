import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest  }) => {
    const { user, token } = useSelector(state => state.user);

    return ( 
        <Route 
            {...rest}
            render={(props) => {
                if(user && token) {
                    return <Component {...props} />
                } else {
                    return <Redirect 
                        to={{ 
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                         }}
                    />
                }
            }}
        />
     );
}
 
export default AuthRoute;