import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePage = ({ currentUser }) => {
    const history = useHistory();

    useEffect(() => {
        if(!currentUser) history.push("/login");
    }, [currentUser, history]);

    return ( 
        <div className="page">
            <h1>Home Page</h1>
        </div>
     );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
 
export default connect(mapStateToProps)(HomePage);