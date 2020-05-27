import React, { useState } from 'react'
import url from '../../../api/url'
import { Redirect, Link } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import MenuBurger from '../../menuBurger/MenuBurger'
import { useForm } from "react-hook-form";
import './Connexion.scss'

const Connexion = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [valid, setValid] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const { connexion, handleSubmit } = useForm()

    const validSub = async () => {
        // Envoi de la requête
        const response = await fetch(`${url}/user/connect`, {
            method: 'POST',
            body: JSON.stringify({
                email: mail,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Récupération du status de la requête
        const result = await response.json();
        console.log(result)

        if (result.status === 200) {
            if (valid === true) {
                localStorage.setItem("userId", result.data.id)
                localStorage.setItem('token', result.token)
                setRedirect(true)
            } else if (valid === false) {
                sessionStorage.setItem("userId", result.data.id)
                sessionStorage.setItem('token', result.token)
                setRedirect(true)
            }
        } else {
            setAlert("email ou mot de passe incorrect")
            setTimeout(() => {
                setAlert('')
            }, 2000);
        }
    }


    const takeMail = (e) => {
        setMail(e.target.value)
    }

    const takePassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        <div className="containerRegistration">
            {window.innerWidth > 1280 ?
                <Navbar type={"models"} />
                :
                <MenuBurger type={"models"} />}
            {props.location.query && props.location.query.pricing && redirect ?
                <Redirect to="/tarifs" />
                : redirect &&
                <Redirect to="/models" />}
            <div className="contentRegister">
                <h4 className="titleRegister">Connexion</h4>
                {alert &&
                    <div className="contentAlert">
                        <p className="textAlert">{alert}</p>
                    </div>}
                <form onSubmit={handleSubmit(validSub)} className="subForm">
                    <input ref={connexion} onChange={takeMail} className={alert === "veuillez entrer une email correct" ? "inputLogError" : "inputLog"} placeholder="email" />
                    <input ref={connexion} type="password" onChange={takePassword} className={alert === "veuillez entrer une email correct" || alert === "" ? "inputLog" : "inputLogError"} placeholder="mot de passe" />
                    <div className="containerStayConnect">
                        <div className="checkBox" onClick={() => { setValid(!valid) }}>
                            {valid === true &&
                                <img className="cochCheck" src={require("../image/valid.png")} alt="valid icon" />}
                        </div>
                        <p className="textStayConnect">rester connecter</p>
                    </div>
                    <button type="submit" className="validLog">Connexion</button>
                </form>
                <Link to={{ pathname: `/inscription`, query: { pricing: true } }} className="linkRegistration">S'inscrire</Link>
            </div>
        </div>
    )
}

export default Connexion