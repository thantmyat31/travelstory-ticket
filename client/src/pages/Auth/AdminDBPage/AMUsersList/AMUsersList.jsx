import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAction, getAllUsersAction, updateUserRoleAction } from './../../../../redux/admin/admin.action';

import UsersListItem from '../../../../components/UsersListItem/UsersListItem';
import Button from '../../../../components/Button/Button';
import Popup from '../../../../components/Popup/Popup';

import styles from './AMUsersList.module.css';
import Title from '../../../../components/Title/Title';

const AMUsersList = () => {
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ isDeletePopupOpen, setIsDeletePopupOpen ] = useState(false);
    const [ userRole, setUserRole ] = useState('');
    const [ userId, setUserId ] = useState('');
    const { admins, subscribers, agencies } = useSelector(state => state.admin);
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(token) dispatch(getAllUsersAction(token));
    }, [dispatch, token]);

    const renderUsers = (users) => {
        return users.map((user, index) => <UsersListItem 
            openDeletePopup={(value) => setIsDeletePopupOpen(value)}
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

    const handleOnDelete = (event) => {
        event.preventDefault();
        setIsDeletePopupOpen(false);
        if(userId && token) dispatch(deleteUserAction({ userId, token }));
    }

    return ( 
        <>
            <Title title="Admin Users" />
            {admins?renderUsers(admins):'loading......'}

            {agencies.length>0&&<Title title="Agencies" />}
            {agencies?renderUsers(agencies):'loading......'}

            {subscribers.length>0&&<Title title="Subscribed Users" />}
            {subscribers?renderUsers(subscribers):'loading......'}

            {isPopupOpen ?
                <Popup title="Change Role">
                    <form className={styles.popup__inner_radios} onSubmit={handleOnSubmit}>
                        {formRadio('admin')}
                        {formRadio('subscriber')}
                        {formRadio('agency')}

                        <div className={styles.form__group}>
                            <Button title="cancel" btnColor="danger" onClick={() => setIsPopupOpen(false)}  />
                            <Button type="submit" title="change" style={{ marginLeft:'10px' }} />
                        </div>
                    </form>
                </Popup>: 
                null
            }

            {isDeletePopupOpen ?
                <Popup title="Are you sure to delete this user?">
                    <div className={styles.form__group}>
                        <Button 
                            title="cancel" 
                            onClick={() => setIsDeletePopupOpen(false)} 
                            btnColor="danger"
                        />
                        <Button 
                            title="delete" 
                            style={{ marginLeft:'10px' }}
                            onClick={handleOnDelete}
                        />
                    </div>
                </Popup> :
                null
            }
        </>
     );
}
 
export default AMUsersList;