import React, {useEffect, useState} from 'react'
import url from '../../../api/url'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = () => {

    const [token, setToken] = useState()
    const [mail, setMail] = useState('')
    const [society, setSociety] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [userId, setUserId] = useState()
    
    const stripe = useStripe();
    const elements = useElements();

    const stripePromise = loadStripe("pk_test_8hlgpZTIPsyWpNGcp2OkpybF00iovkpKJO");

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setToken(localStorage.getItem('token'))
            setUserId(localStorage.getItem('userId'))
        } else {
            setToken(sessionStorage.getItem('token'))
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#ffffff',
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#ffffff' },
                '::placeholder': { color: '#ffffff' },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(phone)
    }

    const subscription = async (event) => {

        if (!validateEmail(mail)) {
            alert('email non valide')
        } else if (!validatePhone(phone)) {
            alert('numéro de téléphone non valide')
        } else {
            fetch(`${url}/subscription/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                },
                body: JSON.stringify({
                    society: society,
                    user_id: userId,
                    phone: phone,
                    email: mail
                })
            });
        }

        fetch(`${url}/v1/customers`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: mail
            })
        })
            .then(response => {
                return response.json();
            })
            .then(result => {
                // result.customer.id is used to map back to the customer object
                // result.setupIntent.client_secret is used to create the payment method

                console.log(result)
            });

        const cardElement = await elements.getElement(CardElement);
        console.log(cardElement)
        // Use your card Element with other Stripe.js APIs
        createPaymentMethod(cardElement, 'prod_HJ9ZDDk7F8i51x', 'price_HJ9Zzx2sIeQ96z');
    }

    function createPaymentMethod(cardElement, customerId, priceId) {
        return stripe
            .createPaymentMethod({
                type: 'card',
                card: cardElement,
            })
            .then((result) => {
                if (result.error) {
                    displayError(result.error);
                } else {
                    createSubscription(
                        customerId,
                        result.paymentMethod.id,
                        priceId);
                }
            });
    }


    function createSubscription(customerId, paymentMethodId, priceId) {
        return (
            fetch(`${url}/create-subscription`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: customerId,
                    paymentMethodId: paymentMethodId,
                    priceId: priceId,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                // If the card is declined, display an error to the user.
                .then((result) => {
                    if (result.error) {
                        // The card had an error when trying to attach it to a customer.
                        throw result;
                    }
                    return result;
                })
                // Normalize the result to contain the object returned by Stripe.
                // Add the addional details we need.
                .then((result) => {
                    return {
                        paymentMethodId: paymentMethodId,
                        priceId: priceId,
                        subscription: result,
                    };
                })
        );
    }

    const displayError = (error) => {
        setError(error)
        setTimeout(() => {
            setError('')
        }, 3000)
    }


    const getMail = (e) => {
        setMail(e.target.value)
    }

    const getSociety = (e) => {
        setSociety(e.target.value)
    }

    const getPhone = (e) => {
        setPhone(e.target.value)
    }


    return (
        <div className="contentPlanStripe" >
            {error && <p>{error}</p>}
            <input className="inputPricing" onChange={getMail} placeholder="Votre email" />
            <input className="inputPricing" onChange={getSociety} placeholder="Nom de votre société" />
            <input className="inputPricing" onChange={getPhone} placeholder="Numéro de téléphone" />
            <div className="inputPricingCard">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <button onClick={subscription} type="submit" className="buttonBuyPricing"><p className="titleBuy">Acheter 80€/mois </p> <p className="noEngagement">sans engagement</p> </button>
        </div>
    )
}

    export default CheckoutForm