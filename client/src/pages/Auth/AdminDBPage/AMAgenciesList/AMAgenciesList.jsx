import React from 'react';
import { useSelector } from 'react-redux';
import ExpressAgencyInfoCard from './../../../../components/ExpressAgencyInfoCard/ExpressAgencyInfoCard';

const AMAgenciesList = () => {
    const { express_agencies } = useSelector(state => state.agency);

    const renderAgenciesCard = (agencies) => {
        return (
            agencies.map((agency, index) => (
                <ExpressAgencyInfoCard key={index} agency={agency} />
            ))
        );
    }

    return ( 
        <>
            {renderAgenciesCard(express_agencies)}
        </>
     );
}
 
export default AMAgenciesList;