"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [succeeded, setSucceeded] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const createPaymentIntent = async () => {
            if (postId) {
                try {
                    const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`
                        },
                        body: JSON.stringify({ postId }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create payment intent');
                    }

                    const data = await response.json();
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret);
                    } else {
                        setError('Failed to create payment intent. Please try again.');
                    }
                } catch (error) {
                    setError('An error occurred. Please try again.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('Invalid post ID.');
            }
        };

        createPaymentIntent();
    }, [postId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card details are not available.');
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Cardholder Name', // Change as needed
                },
            },
        });

        if (error) {
            console.error('Payment confirmation error:', error);
            setError('Payment failed. Please try again.');
        } else {
            // Handle successful payment
            try {
                const savePaymentResponse = await fetch('http://localhost:5000/api/payments/save-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({ paymentIntentId: paymentIntent.id, postId }),
                });

                if (!savePaymentResponse.ok) {
                    const errorMessage = await savePaymentResponse.text();
                    console.error('Failed to save payment:', errorMessage);
                    setError('Payment succeeded, but failed to save to the database. Please contact support.');
                } else {
                    setSucceeded(true);
                    setTimeout(() => {
                        window.location.href = `/blog/${postId}`; // Redirect to the blog post page
                    }, 2000);
                }
            } catch (err) {
                console.error('Error while saving payment:', err);
                setError('Payment succeeded, but failed to save to the database. Please contact support.');
            }
        }
    };

    return (
        <div>
            {loading ? (
                <h1>Processing Payment for Post ID: {postId}...</h1>
            ) : error ? (
                <div>
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            ) : succeeded ? (
                <h1>Payment was successful! Redirecting...</h1>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Payment for Post ID: {postId}</h1>
                    <CardElement />
                    <button type="submit" disabled={!clientSecret || !stripe}>
                        Pay
                    </button>
                </form>
            )}
        </div>
    );
};

// Wrap the PaymentPage with Elements
const WrappedPaymentPage = () => (
    <Elements stripe={stripePromise}>
        <PaymentPage />
    </Elements>
);

export default WrappedPaymentPage;
