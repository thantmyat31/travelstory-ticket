import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createExchangeRateAction, updateExchangeRateAction, getExchangeRateAction } from './../../../../redux/exchange/exchange.action';

import Title from './../../../../components/Title/Title';
import Button from './../../../../components/Button/Button';
import Input from './../../../../components/Input/Input';

import styles from './AMExchange.module.css';

const AMExchange = () => {
    const [ exRate, setExRate ] = useState({
        dollarXR: 0
    });
    const { token } = useSelector(state => state.user);
    const { exchangeRate } = useSelector(state => state.exchange);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExchangeRateAction());
    }, [dispatch]);

    useEffect(() => {
        if(exchangeRate) setExRate(exchangeRate);
    }, [exchangeRate]);


    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(createExchangeRateAction({ exchangeRate: exRate, token }));
    }

    const handleOnUpdate = (event) => {
        event.preventDefault();
        dispatch(updateExchangeRateAction({ exchangeRate: exRate, token }));
    }

    return ( 
        <>
            <Title title="Exchange Rate" />
            <div className={styles.card}>
                {exchangeRate?
                    <div className={styles.exchange}>
                        <div><span className={styles.currency}>1 USD</span> = <span className={styles.exchange__rate}>{exchangeRate?.dollarXR}</span> MMK</div>
                    </div>
                : null}
            
                <form onSubmit={!exchangeRate?handleOnSubmit:handleOnUpdate}>
                    <div className={styles.input__gp}>
                        <Input id="dollar" min="0" type="number" name="dollar" label="Dollar Exchange Rate" value={exRate.dollarXR} onChange={(e) => setExRate({...exRate, dollarXR: e.target.value})} />
                    </div>
                    <span className={styles.button}>
                    {
                        !exchangeRate?
                        <Button type="submit" title="save" />:
                        <Button type="submit" title="update" />
                    }
                    </span>
                </form>
            </div>
        </>
     );
}
 
export default AMExchange;