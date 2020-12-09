import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCitiesAction } from './../../../../redux/city/city.action';

import Input from './../../../../components/Input/Input';
import Button from './../../../../components/Button/Button';

import styles from './AGCreateTrip.module.css';
import { toast, ToastContainer } from 'react-toastify';

const AGCreateTrip = () => {
    const [ busNumber, setBusNumber ] = useState('');
    const [ tripName, setTripName ] = useState('');
    const [ tripCode, setTripCode ] = useState('');
    const [ trips, setTrips ] = useState([]);
    const [ cityFrom, setCityFrom ] = useState('');
    const [ cityTo, setCityTo ] = useState('');
    const [ busType, setBusType ] = useState('');
    const { express_agency } = useSelector(state => state.agency);
    const { cities } = useSelector(state => state.city);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCitiesAction());
    }, [dispatch]);

    useEffect(() => {
        if(trips.length) {
            setTripName(getTripName(trips));
        }
    }, [trips]);

    const renderCitiesOption = (cities) => {
        return cities.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)
    }

    const getTripName = (trips) => {
        if (trips.length > 0) {
            return trips.reduce((a, b) => {return `${a} - ${b.cityTo}`}, trips[0].cityFrom);
        } else {
            return '';
        }
    }

    const handleOnInsertTrip = () => {
        if(cityFrom === '') toast.error('Enter City From filed.');
        if(cityTo === '') toast.error('Enter City To field.');
        if(cityFrom && cityTo) setTrips([...trips, { cityFrom, cityTo }]);
        
        setCityFrom('');
        setCityTo('');
    }

    if(!express_agency) return (
        <div>
            <h2>No express agency you have added.</h2>
            <p>Please add an express agency before creating trips.</p>
        </div>
    );

    return ( 
        <>
            <ToastContainer />
            <form>
                <Input type="text" label="Bus Number" name="bus_number" onChange={(e) => setBusNumber(e.target.value)} value={busNumber} required />
                <Input type="text" label="Trip Name" name="trip_name" value={tripName} disabled required />
                <Input type="text" label="Trip Code" name="trip_code" onChange={(e) => setTripCode(e.target.value)} value={tripCode} />
                
                <div className={styles.groups}>
                    <label>Trips <b> &#8727;</b></label>
                    {trips.length ? 
                        <p className={styles.trip__name}>
                            {getTripName(trips)}
                        </p> : 
                    null}

                    <div className={styles.group__row}>
                        <div className={styles.group__col}>
                            <select className={styles.select} name="city_from" onChange={(e) => setCityFrom(e.target.value)} value={cityFrom}>
                                <option value="">-- City From --</option>
                                {renderCitiesOption(cities)}
                            </select>
                        </div>
                        <div className={styles.group__col}>
                            <select className={styles.select} name="city_to" onChange={(e) => setCityTo(e.target.value)} value={cityTo}>
                                <option value="">-- City To --</option>
                                {renderCitiesOption(cities)}
                            </select>
                        </div>
                    </div>
                    <div className={styles.group__row}>
                        <Button onClick={handleOnInsertTrip} title="Add Trip" btnColor="danger" type="button" style={{ padding:"5px 10px" }} />
                    </div>
                </div>

                <div className={styles.groups}>
                    <label>Bus Type <b> &#8727;</b></label>
                    <div className={styles.bus__type}>
                        <input id="bus_type_normal" type="radio" name="bus_type" value="normal" onChange={() => setBusType('normal')} />
                        <label htmlFor="bus_type_normal">Normal</label>
                    </div>
                    <div className={styles.bus__type}>
                        <input id="bus_type_vip" type="radio" name="bus_type" value="vip" onChange={() => setBusType('vip')} />
                        <label htmlFor="bus_type_vip">VIP</label>
                    </div>
                </div>

                {
                    busType && busType === 'normal' ?
                    <div className={styles.groups}>
                        <label>Bus Seat Normal</label>
                    </div> : null
                }
                {
                    busType && busType === 'vip' ?
                    <div className={styles.groups}>
                        <label>Bus Seat VIP</label>
                    </div> : null
                }
            </form>
        </>
     );
}
 
export default AGCreateTrip;