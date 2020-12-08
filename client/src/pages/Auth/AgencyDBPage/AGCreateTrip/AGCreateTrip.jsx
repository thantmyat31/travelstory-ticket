import React from 'react';
import { useSelector } from 'react-redux';

const AGCreateTrip = () => {
    const { express_agency } = useSelector(state => state.agency);

    if(!express_agency) return (
        <div>
            <h2>No express agency you have added.</h2>
            <p>Please add an express agency before creating trips.</p>
        </div>
    );

    return ( 
        <div>
            AG Create Trip
        </div>
     );
}
 
export default AGCreateTrip;