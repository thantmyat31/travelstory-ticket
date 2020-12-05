import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AgencyRoute = ({ component: Component, ...rest  }) => {
    const { isAuth, user } = useSelector(state => state.user);

    return ( 
        <Route 
            {...rest}
            render={(props) => {
                if(isAuth && user?.role === 'agency') {
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
 
export default AgencyRoute;