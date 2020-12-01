import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserTokenStatusAction } from '../redux/user/user.action';

const useCheckTokenValid = () => {
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(token) dispatch(checkUserTokenStatusAction(token))
    }, [dispatch, token]);
}
 
export default useCheckTokenValid;