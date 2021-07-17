import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from './../utils/helpers';

export default function CheckoutForm() {
	const { cart, totalAmount, shippingFee, clearCart } = useCartContext();
	const { myUser } = useUserContext();
	const history = useHistory();

	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	const createPaymentIntent = async () => {
		try {
			const { data } = await axios.post(
				'./.netlify/functions/create-payment-intent',
				JSON.stringify({ cart, totalAmount, shippingFee })
			);
			setClientSecret(data.clientSecret);
		} catch (error) {}
	};

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		createPaymentIntent();
		// eslint-disable-next-line
	}, []);

	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			setError(null);
			setProcessing(false);
			setSucceeded(true);
			setTimeout(() => {
				clearCart();
				history.push('/');
			}, 5000);
		}
	};

	return (
		<div>
			{succeeded ? (
				<article>
					<h4>Thank you</h4>
					<h4>Your payment was successful!</h4>
					<h4>Redirecting to home page shortly</h4>
				</article>
			) : (
				<article>
					<h4>Hello, {myUser && myUser.name}</h4>
					<p>Your total is {formatPrice(totalAmount)}</p>
					<p>Test Card Number: 4242 4242 4242 4242</p>
				</article>
			)}
			<form id="payment-form" onSubmit={handleSubmit}>
				<CardElement id="card-element" options={cardStyle} onChange={handleChange} />
				<button disabled={processing || disabled || succeeded} id="submit">
					<span id="button-text">
						{processing ? <div className="spinner" id="spinner"></div> : 'Pay now'}
					</span>
				</button>
				{/* Show any error that happens when processing the payment */}
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
				{/* Show a success message upon completion */}
				<p className={succeeded ? 'result-message' : 'result-message hidden'}>
					Payment succeeded, see the result in your
					<a href={`https://dashboard.stripe.com/test/payments`}>Stripe dashboard.</a>
					Refresh the page to pay again.
				</p>
			</form>
		</div>
	);
}
