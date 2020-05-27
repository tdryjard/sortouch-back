import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import './BurgerMenu.scss'

const BurgerMenu = (props) => {
    const [menuActive, setMenuActive] = useState(false)
    const [sectionSiteActive, setSectionSiteActive] = useState(false)
    const [sectionChatbotActive, setSectionChatbotActive] = useState(false)
    const [sectionIntegrationActive, setSectionIntegrationActive] = useState(false)

    return (
        <div className="contentBurgerMenu">
            {!menuActive &&
                <>
                    <Navbar type={"doc"} />
                    <img onClick={() => { setMenuActive(true) }} alt="menu" className="burgerIcon" src={require('./image/menu_icon.png')} />
                </>}
            {menuActive &&
                <div className="containerMenuBurgerOpen">
                    <img onClick={() => { setMenuActive(false) }} alt="menu" className="crossIconDoc" src={require('./image/cross.png')} />
                    <div className="contentNameSectionMenu">
                        <Link to="/utiliser-le-site-sortouch" className={props.link === "sortouch" ? "linkMenuDocEditorOn" : "linkMenuDocEditor"}>Guide Sortouch</Link>
                    </div>

                    <div className="contentNameSectionMenu">
                        <Link to="/editeur-doc" className={props.link === "editor" ? "linkMenuDocEditorOn" : "linkMenuDocEditor"}>Éditeur de chatbot</Link>
                    </div>

                    <div className="contentNameSectionMenu">
                        <p onClick={() => { setSectionChatbotActive(!sectionChatbotActive) }} className="titleSectionMenu">Créer le chatbot parfait</p>
                        {!sectionChatbotActive ? <img onClick={() => { setSectionChatbotActive(true) }} className="imgSectionMenuDoc" src={require('../image/plus.png')} /> :
                            <img onClick={() => { setSectionChatbotActive(false) }} className="imgSectionMenuDoc" src={require('../image/moins.png')} />}
                    </div>
                    <div className={sectionChatbotActive || props.sectionSelect === "blog" ? "siteMenuDocOn" : "siteMenuDocOff"}>
                        <Link to="/bien-cibler-doc" className={props.link === "cible" ? "linkMenuDocOn" : "linkMenuDoc"}>Cibler ses visiteurs</Link>
                        <Link to="/les-bonne-question-reponse-doc" className={props.link === "question" ? "linkMenuDocOn" : "linkMenuDoc"}>Les bonnes questions-réponse</Link>
                        <Link to="/trier-efficacement-doc" className={props.link === "sort" ? "linkMenuDocOn" : "linkMenuDoc"}>Trier efficacement</Link>
                    </div>

                    <div className="contentNameSectionMenu">
                        <p onClick={() => { setSectionChatbotActive(!sectionIntegrationActive) }} className="titleSectionMenu">Intégration sur votre site</p>
                        {!sectionIntegrationActive ? <img onClick={() => { setSectionIntegrationActive(true) }} className="imgSectionMenuDoc" src={require('../image/plus.png')} /> :
                            <img onClick={() => { setSectionIntegrationActive(false) }} className="imgSectionMenuDoc" src={require('../image/moins.png')} />}
                    </div>
                    <div className={sectionIntegrationActive || props.sectionSelect === "install" ? "siteMenuDocOn" : "siteMenuDocOff"}>
                        <Link to="/installer-react" className={props.link === "docReact" ? "linkMenuDocOn" : "linkMenuDoc"}>ReactJs</Link>
                        <Link to="/installer-wordpress" className={props.link === "docWordpress" ? "linkMenuDocOn" : "linkMenuDoc"}>WordPress</Link>
                    </div>
                </div>}
        </div>
    )
}

export default BurgerMenu