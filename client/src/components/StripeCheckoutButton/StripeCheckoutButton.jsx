import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makePaymentAction } from './../../redux/ticket/ticket.action';
import { errorReset } from './../../redux/user/user.action';

import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
 
const StripeCheckoutButton = ({price, selectedSeats, tripId,...rest}) => {
    const priceForStripe = (price/1350).toFixed(2) * 100;
    const publishableKey = process.env.REACT_APP_STRIPE_KEY;
    const { boughtTicketInfo, error } = useSelector(state => state.ticket);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(errorReset());
        if(error) toast.error('There was an issue with your payment.');
    }, [dispatch, error]);

    useEffect(() => {
        if(boughtTicketInfo) history.push('/completion');
    }, [boughtTicketInfo, history]);

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
                image={`${process.env.REACT_APP_IMAGE}/travelstory-logo.png`}
                description={`Your total is $${(price/1350).toFixed(2)}.`}
                amount={priceForStripe}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
            />
        </>
    )
}

export default StripeCheckoutButton;