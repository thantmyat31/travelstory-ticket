import React from 'react';
import Layout from '../../components/Layout/Layout';
import Button from './../../components/Button/Button';
import styles from './Completion.module.css';

const Completion = ({ history }) => {
    return ( 
        <Layout>
            <div className="page">
                <div className={styles.container}>
                    <h3>Purchasement successful.</h3>
                    <Button title="Go Back Home" onClick={() => history.push('/')} />
                </div>
            </div>
        </Layout>
     );
}
 
export default Completion;