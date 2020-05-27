import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Plan.scss'

const Plan = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }

    }, [])

    return (
        <div className="containerPlan">
            <div className="contentPlan">
                <h2 className="titlePlan">Gratuit</h2>
                <div className="containerOptionPlan">
                    <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                    <p className="textOptionPlan">1 modèle de chatbot</p>
                </div>
                <div className="containerOptionPlan">
                    <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                    <p className="textOptionPlan">Intégration sur votre site</p>
                </div>
                <div className="containerOptionPlan">
                    <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                    <p className="textOptionPlan">200 réceptions de messages par mois</p>
                </div>
                <div className="containerOptionPlan">
                    <img src={require('../image/valid.png')} alt="valid" className="validImg" />
                    <p className="textOptionPlan">500 stockages de coordonnées</p>
                </div>
                {!userId ?
                    <Link to="/inscription" className="buttonPricing">
                        Commencer
                </Link>
                    :
                    <Link to="/models"className="buttonPricing">
                        Commencer
                </Link>}
            </div>
        </div>
    );
};

export default Plan