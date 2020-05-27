import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './MenuBurger.scss'

const MenuBurger = (props) => {
    const [userId, setUserId] = useState()
    const [modelId] = useState(sessionStorage.getItem('modelId'))
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }

    }, [])

    return(
        <div>
            {!active ?
            <img src={require('./image/menu_icon.png')} className="menuBurger" alt="menu" onClick={() => {setActive(true)}}/>
                :
            <div className="containerMenuBurger">
                <img onClick={() => {setActive(false)}} alt="menu" className="crossIconBurger" src={require('./image/cross.png')}/>
                <Link to="/" className={props.type === "landing" ? "linkBurgerActive" : "linkBurger"} >Accueil</Link>
                <Link to="/utiliser-le-site-sortouch" className={props.type === "editor-doc" ? "linkBurgerActive" : "linkBurger"} >Docs</Link>
                <Link to="/editeur-doc" className={props.type === "tarif" ? "linkBurgerActive" : "linkBurger"} >Tarifs</Link>
                {!userId && !modelId ?
                    <div className="contentConnect">
                        <Link to="/connexion" className="connexionNavbar">Connexion</Link>
                        <Link to="/inscription" className="subNavbar">inscription</Link>
                    </div>
                :
                <>
                    <Link to="/models" className={props.type === "models" ? "linkBurgerActive" : "linkBurger"} >Mes chatbot</Link>
                    <Link to="/base-de-donnee" className={props.type === "data" ? "linkBurgerActive" : "linkBurger"} >Données collectées</Link>
                </>
                }
            </div>
        }
        </div>
    )
}

export default MenuBurger