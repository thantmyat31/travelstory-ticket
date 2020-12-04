import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UsersListItem from '../../../../components/UsersListItem/UsersListItem';
import Button from '../../../../components/Button/Button';
import Popup from '../../../../components/Popup/Popup';

import styles from './AMUsersList.module.css';
import colors from '../../../../config/colors';
import { updateUserRoleAction } from '../../../../redux/admin/admin.action';

const AMUsersList = () => {
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ userRole, setUserRole ] = useState('');
    const [ userId, setUserId ] = useState('');
    const { admins, subscribers, agencies } = useSelector(state => state.admin);
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const renderUsers = (users) => {
        return users.map((user, index) => <UsersListItem 
            openPopup={(value) => setIsPopupOpen(value)} 
            userRole={(value) => setUserRole(value)} 
            userId={(value) => setUserId(value)}
            key={index} 
            user={user} 
        />)
    }

    const formRadio = (name) => {
        return (
            <div className={styles.form__group}>
                <input type="radio" id={name} name="role" value={name} onChange={handleOnCheckRole} checked={name === userRole? 'checked': ''} />
                <label htmlFor={name}>{name}</label>   
            </div>
        )
    }

    const handleOnCheckRole = (event) => {
        setUserRole(event.currentTarget.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setIsPopupOpen(false);
        if(userRole && token && userId) dispatch(updateUserRoleAction({ userRole, token, userId }));
    }

    return ( 
        <>
            <h3 className={styles.label}>Admin Users</h3>
            {admins?renderUsers(admins):'loading......'}

            {subscribers.length>0&&<h3 className={styles.label}>Subscribed Users</h3>}
            {subscribers?renderUsers(subscribers):'loading......'}

            {agencies.length>0&&<h3 className={styles.label}>Agencies</h3>}
            {agencies?renderUsers(agencies):'loading......'}

            {isPopupOpen ?
                <Popup title="Change Role">
                    <form className={styles.popup__inner_radios} onSubmit={handleOnSubmit}>
                        {formRadio('admin')}
                        {formRadio('subscriber')}
                        {formRadio('agency')}

                        <div className={styles.form__group}>
                            <Button title="cancel" onClick={() => setIsPopupOpen(false)} style={{ backgroundColor: colors.danger, borderColor: colors.danger }} />
                            <Button type="submit" title="change" style={{ marginLeft:'10px' }} />
                        </div>
                    </form>
                </Popup>: 
                null
            }
        </>
     );
}
 
export default AMUsersList;