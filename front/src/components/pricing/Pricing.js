import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import Navbar from '../navbar/Navbar'
import MenuBurger from '../menuBurger/MenuBurger'
import Plan from './plan/Plan'
import Plan2 from './plan2/Plan2'
import Plan3 from './plan3/Plan3'
import './Pricing.scss'

const Pricing = () => {
    const stripePromise = loadStripe('pk_test_8hlgpZTIPsyWpNGcp2OkpybF00iovkpKJO');

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
          base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {color: '#fce883'},
            '::placeholder': {color: '#87bbfd'},
          },
          invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
          },
        },
      };

    return (
        <div className="containerPricing"> 
            {window.innerWidth > 1280 ?
            <Navbar type={"tarifs"}/>
            :
            <MenuBurger type={"models"}/>}
            <div className="backPricing">
                <img src={require('./image/plan1.svg')} alt="free plan" className="backPricingImg"/>
                <img src={require('./image/plan2.svg')} alt="2ème plan" className="backPricingImg"/>
                <img src={require('./image/plan3.svg')} alt="3ème plan back" className="backPricingImg"/>
            </div>
            <Plan/>
            <Elements stripe={stripePromise}>
                <Plan2 options={CARD_OPTIONS}/>
            </Elements>
            <Elements stripe={stripePromise}>
                <Plan3 options={CARD_OPTIONS}/>
            </Elements>
        </div>
    )
}

export default Pricing