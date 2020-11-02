import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from './../../components/Button/Button';
import styles from './NotFound.module.css';

const NotFoundPage = () => {
    const history = useHistory();
    return ( 
        <div className="page">
            <div className={styles.notfound}>
                <h1>404</h1>
                <h3>Current page not found.</h3>
                <br />
                <Button title="Go back" onClick={() => history.goBack()} />
            </div>
        </div>
     );
}
 
export default NotFoundPage;