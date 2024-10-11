"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||'');
console.log(stripePromise)

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
                    const response = await fetch('https://pet-care-server-three.vercel.app/api/payments/create-payment-intent', {
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
                const savePaymentResponse = await fetch('https://pet-care-server-three.vercel.app/api/payments/save-payment', {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {loading ? (
                <h1 className="text-xl font-semibold">Processing Payment for Post ID: {postId}...</h1>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-4">
                    <h1 className="font-bold">Error</h1>
                    <p>{error}</p>
                </div>
            ) : succeeded ? (
                <h1 className="text-xl font-semibold">Payment was successful! Redirecting...</h1>
            ) : (
                <form className="w-full max-w-md bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-4">Payment for Post ID: {postId}</h1>
                    <div className="mb-4">
                        <div className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <CardElement
                                id="card-element"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#32325d',
                                            '::placeholder': {
                                                color: '#a0aec0',
                                            },
                                        },
                                        invalid: {
                                            color: '#fa755a',
                                            iconColor: '#fa755a',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <button
                        className="w-full py-3 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        type="submit"
                        disabled={!clientSecret || !stripe}
                    >
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
