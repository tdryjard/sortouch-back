import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'
import QuestionChat from './QuestionChat'
import Chatbot from 'sortouch-react'
import MenuBurger from '../menuBurger/MenuBurger'
import './Landing.scss'

const Landing = () => {
    const [textEffect1, setTextEffect1] = useState('')
    const [textEffect2, setTextEffect2] = useState('')
    const [textEffect3, setTextEffect3] = useState('')
    const [textEffect4, setTextEffect4] = useState('')
    const [scrollPosition, setSrollPosition] = useState(0);


    const textLanding1 = getOffset(document.getElementById('textLanding1')).top
    const textLanding2 = getOffset(document.getElementById('textLanding2')).top
    const textLanding3 = getOffset(document.getElementById('textLanding3')).top
    const textLanding4 = getOffset(document.getElementById('textLanding4')).top

    function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }


    useEffect(() => {
        if (!textEffect4) {
            window.onscroll = () => {
                if (window.location) {
                    if (window.innerWidth > 1280) {
                        if (window.pageYOffset - 1150 > textLanding2 && !textEffect2) setTextEffect2('ok')
                        if (window.pageYOffset - 1950 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 2800 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    } else {
                        if (window.pageYOffset - 750 > textLanding2 && !textEffect2) setTextEffect2('ok')
                        if (window.pageYOffset - 1150 > textLanding3 && !textEffect3) setTextEffect3('ok')
                        if (window.pageYOffset - 1550 > textLanding4 && !textEffect4) setTextEffect4('ok')
                    }
                }
            }

        }
    }, []);

    return (
        <div className="containerLanding">
            {window.innerWidth > 1280 ?
                <Navbar type={"landing"} />
                :
                <MenuBurger type={"landing"} />}
            <div className="containerTitleLanding1">
                <img src={require('./image/money.png')} alt="gains money" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Transformer ses visiteurs en clients</h1>
            </div>
            <div className="containerTitleLanding">
                <img src={require('./image/time.png')} alt="gains time" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Gagner du temps dans le traitement de ses mails</h1>
            </div>
            <div className="containerTitleLanding">
                <img src={require('./image/data.png')} alt="gains data" className="imgTitleLanding" />
                <h1 className="titleLandingTop">Se créer un base de donnée d'email et de numéro de téléphone</h1>
            </div>
            <div className="containerHeadLanding">
                <div className="containerTextHead">
                    <div className="contentChatbotLanding">
                        {window.innerWidth > 1280 && <img alt="icon chat" src={require('./image/logo.png')} className="iconChatLanding" />}
                        {window.innerWidth < 1280 &&
                            <div className="contentTitleChatLandingMobile">
                                <img alt="icon chat" src={require('./image/logo.png')} className="iconChatLanding" />
                                <h1 className="titleChatLanding"><QuestionChat text={`Créez votre chatbot gratuitement avec Sortouch`} /></h1>
                            </div>}
                        <div className="contentTextChatLanding">
                            {window.innerWidth > 1280 &&
                                <h1 className="titleChatLanding"><QuestionChat text={`Créez votre chatbot gratuitement avec Sortouch`} /></h1>}
                            <div className="containerTextLanding1">
                                <h2 id="textLanding1" className={"textChatLanding"}>L'éditeur de chatbot le plus simple à prendre en main</h2>
                            </div>
                            <img src={require('./image/editor.png')} alt="editeur" className="editorImg" />
                            <div className="containerTextLanding">
                                <h2 id="textLanding2" className={textEffect2 ? "textChatLanding" : "displayNone"} >Intégrez facilement votre chatbot à votre site</h2>
                            </div>
                            <div className="containerLogoLanding">
                                <img src={require('./image/react.svg')} alt="react logo" className="logoInstallLanding" />
                                <img src={require('./image/wordpress.png')} alt="wordpress logo" className="logoInstallLanding" />
                            </div>
                            <div className="containerTextLanding">
                                <h2 id="textLanding3" className={textEffect3 ? "textChatLanding" : "displayNone"}>Recevez les prises de contact avec vous via votre chatbot triées par catégories !</h2>
                            </div>
                            <div className="containerMessageImg">
                                <img src={require('./image/formChatbot.png')} alt="formulaire contact chatbot" className="formChatImg" />
                                <img src={require('./image/message_area.jpg')} alt="espace message" className="areaMessageImgLanding" />
                            </div>
                            <div className="containerTextLanding">
                                <h2 id="textLanding4" className={textEffect4 ? "textChatLanding" : "displayNone"}>Retrouvez tous les emails et numéros de téléphones récoltés</h2>
                            </div>
                            <img src={require('./image/data_area.jpg')} alt="espace base de donnée" className="areaImgLanding" />
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="time gain" src={require('./image/time_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Votre site est votre vitrine<br/>Ne laissez pas vos visiteurs regarder puis partir sans laisser de traces</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">En invitants les visiteurs de votre site à vous laisser leurs contacts vous ne serez plus qu'une simple vitrine<br />Votre chatbot sortouch vous aide à transformer un simple visiteur en futur client en reprenant contact avec lui</p>
                            </div>
                        </div>
                    </div>
                    <div className="contentHeadLanding">
                        {window.innerWidth < 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Vos visiteurs sont humains</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Demander simplement à un visiteur de donner son adresse mail ne suffis pas<br/>C'est devenu tellement inpersonnel et répandu que l'on appuie directement sur la croix quand l'on voit ce genre de popup<br/>Vos visiteurs sont humain et on besoin d'échanger, d'être conquis avant de donner leurs contacts<br/>C'est là qu'un bon chatbot fais la différence</p>
                            </div>
                        </div>
                        {window.innerWidth > 1280 &&
                            <img alt="prospect gain" src={require('./image/graphic.svg')} className="imgHeadLanding" />}
                    </div>
                    <div className="contentHeadLanding">
                        <img alt="mail" src={require('./image/mail_back.svg')} className="imgHeadLanding" />
                        <div className="windowTextHead">
                            <div className="contentTitleLanding">
                                <h1 className="titleLanding">Les tunnels de vente sont indipensables</h1>
                            </div>
                            <div className="contentTextLanding">
                                <p className="textLanding">Un tunnel de vente c'est plusieurs étapes afin de transformer un prospect en client<br/>Si vous avez résussis à attirer un prospect sur votre site, c'est un pas de géant dans la conversion en acheteur<br/>Mais la plupart du temps, cela ne suffis pas !<br/>Il faut encore préciser ce tunnel de vente en recontactant personnellement votre prospect, par mail ou par téléphone dans les meilleurs des cas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerButtonLanding">
                <Link to="/inscription" className="goButtonLanding">Essayer gratuitement</Link>
            </div>
            <Chatbot modelId={1} userId={1} />
        </div>
    )
}

export default Landing