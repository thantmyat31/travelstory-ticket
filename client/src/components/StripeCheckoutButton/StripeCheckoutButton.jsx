import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makePaymentAction } from './../../redux/ticket/ticket.action';
import { errorReset } from './../../redux/user/user.action';

import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import useDollarXR from './../../hooks/useDollarXR';
 
const StripeCheckoutButton = ({price, selectedSeats, tripId,...rest}) => {
    const amountInDollar = useDollarXR(price);
    const priceForStripe = amountInDollar * 100;
    const publishableKey = process.env.REACT_APP_STRIPE_KEY;
    const { completeToken, error } = useSelector(state => state.ticket);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(errorReset());
        if(error) toast.error('There was an issue with your payment.');
    }, [dispatch, error]);

    useEffect(() => {
        if(completeToken) history.push('/completion');
    }, [completeToken, history]);

    const onToken = (token) => {
        dispatch(makePaymentAction({
            ...rest,
            tripId,
            selectedSeats, 
            price,
            amount: priceForStripe,
            token
        }));
    }
 
    return (
        <>
            <ToastContainer />
            <StripeCheckout
                label="Purchase Now"
                name="Travel Stroy Ltd."
                image={`${process.env.REACT_APP_IMAGE}/constants/travelstory-logo.png`}
                description={`Your total is $${amountInDollar}.`}
                amount={priceForStripe}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
            />
        </>
    )
}

export default StripeCheckoutButton;