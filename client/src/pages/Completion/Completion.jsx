import React, {useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import Button from './../../components/Button/Button';
import styles from './Completion.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkCompleteTokenAction } from '../../redux/ticket/ticket.action';

const Completion = ({ history }) => {
    const { completeToken } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (completeToken) dispatch(checkCompleteTokenAction(completeToken));    
    }, [dispatch, completeToken]);
    
    if(!completeToken) {
        return <Redirect to="/" />
    }
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