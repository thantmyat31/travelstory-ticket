import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkAuth } from './../../utils/Auth';

const AuthRoute = ({ component: Component, ...rest  }) => {
    return ( 
        <Route 
            {...rest}
            render={(props) => {
                if(checkAuth()) {
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