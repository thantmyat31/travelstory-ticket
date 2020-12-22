import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useDollarXR = (price) => {
    const [ dollarXR, setDollarXR ] = useState();
    const { exchangeRate } = useSelector(state => state.exchange);

    useEffect(() => {
        if(exchangeRate) setDollarXR(exchangeRate?.dollarXR);
    }, [exchangeRate]);
    
    return (price/dollarXR).toFixed(2);
}
 
export default useDollarXR;