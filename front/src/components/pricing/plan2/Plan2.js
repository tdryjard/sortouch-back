import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Plan2.scss'

const Plan2 = () => {
    const [active, setActive] = useState(false)
    const [userId, setUserId] = useState()

    const stripePromise = loadStripe("pk_test_8hlgpZTIPsyWpNGcp2OkpybF00iovkpKJO");

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className="containerPlan">
            {!active ?
                <div className="contentPlan">
                    <h2 className="titlePlan2">60€/mois</h2>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Modèles de chatbot illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Intégration sur votre site</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">Réceptions de messages par mois illimité</p>
                    </div>
                    <div className="containerOptionPlan">
                        <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                        <p className="textOptionPlan">10 000 stockages de coordonnées</p>
                    </div>
                    {!userId ?
                        <Link to={{ pathname: `/inscription`, query: { pricing: true } }} className="buttonPricing2">
                            Souscrire
                        </Link>
                        :
                        <div onClick={() => { setActive(true) }} className="buttonPricing2">
                            Souscrire
                        </div>}
                </div>
                :

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            }
        </div>
    );
};

export default Plan2