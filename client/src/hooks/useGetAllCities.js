import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCitiesAction } from './../redux/city/city.action';

const useGetAllCities = () => {
    const { cities } = useSelector(state => state.city);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCitiesAction());
    }, [dispatch]);
    
    if(cities) return cities;
    return [];
}
 
export default useGetAllCities;
