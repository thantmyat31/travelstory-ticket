import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSearchTripsAction, updateSeatsAction } from './../../redux/trip/trip.action';

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
 
const StripeCheckoutButton = ({price, selectedSeats, tripId,...rest}) => {
    const priceForStripe = (price/1350).toFixed(2) * 100;
    const publishableKey = process.env.REACT_APP_STRIPE_KEY;
    const dispatch = useDispatch();
    const history = useHistory();

    const onToken = (token) => {
        axios({
            url: `${process.env.REACT_APP_API}/ticket/payment`,
            method: 'POST',
            data: {
                ...rest,
                tripId,
                selectedSeats, 
                amount: priceForStripe,
                token
            }
        })
        .then(response => {
            if(response?.data?.success) {
                dispatch(updateSeatsAction({selectedSeats, tripId}));
                dispatch(clearSearchTripsAction());
                history.push('/completion');
            }
        })
        .catch(error => {
            console.log("[ERROR]",error?.response?.data?.message);
            toast.error('There was an issue with your payment. Please sure you use the provided credit card.');
        })
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