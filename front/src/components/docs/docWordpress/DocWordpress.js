import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import url from '../../../api/url'
import './DocWordpress.scss'

const DocReact = () => {
    const [userId, setUserId] = useState()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
        }
    }, [])

    return (
        <div className="containerDoc">
            {window.innerWidth > 1280 && <Navbar type={"doc"} />}
            {window.innerWidth > 1280 && <Menu sectionSelect="install" link="docWordpress" />}
            {window.innerWidth < 1280 && <MenuBurger sectionSelect="install" link="docWordpress" />}
            <div className="contentDoc">
                <h1 className="titleDoc">Intégrer son chatbot à son site Wordpress</h1>
                <img alt="react logo" src={require('./image/wordpress.png')} className="reactLogo" />
                <h4 className="titleContainerSectionDocWordpress">Sur votre ordinateur</h4>
                <a href="sortouch-plugin.zip"
                    download="sortouch-plugin" className="linkDownload">1) Télécharger le plugin</a>
                <p className="textDoc">2) Extraire le dossier le placer dans le dossier wp-content/plugins de wordpress en local</p>
                <h4 className="titleContainerSectionDocWordpress">Sur wordrpess</h4>
                <p className="textDoc">1) Ajouter un bloc Shortcode (code court) sur votre site wordpress</p>
                <img src={require('./image/add_shortcode.png')} alt="add shortcode" className="imgDocWordpress" />
                <p className="textDocMargin">2) écrivez la même chose que l'image ci-dessous en remplaçant le texte entre guillemets avec votre user id et votre chatbot id</p>
                <div className="containerShortcode">
                    <p className="shortcode">[erw_sortouch user="votre user id" model="votre chatbot id"]</p>
                </div>
                <h4 className="titleContainerSectionDocWordpress">Trouver son user id</h4>
                <h4 className="titleContainerSectionDoc">Votre user id : {userId ? userId : <Link to="/connexion" className="connexionDoc">Se connecter</Link>}</h4>
                <h4 className="titleContainerSectionDocWordpress">Trouver son chatbot id</h4>
                {userId &&
                <p className="textDoc">Se rendre votre <Link to="/models">page model</Link> et allez dans les option de votre chatbot (exemple ci-dessous)</p> }
                <div className="containerStepModelid">
                    <img alt="model id étape 1" src={require('./image/modelid1.png')} className="takeModelId" />
                    <img alt="model id étape 2" src={require('./image/modelid2.png')} className="takeModelId" />
                </div>
            </div>
        </div>
    )
}

export default DocReact