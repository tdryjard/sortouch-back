import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import url from '../../../api/url'
import './DocSortouch.scss'

const DocSortouch = () => {
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
            {window.innerWidth > 1280 && <Menu link="sortouch" />}
            {window.innerWidth < 1280 && <MenuBurger link="sortouch" />}
            <div className="contentDoc">
                {!userId ?
                    <div className="contentDocSortouch">
                        <h4 className="titleStepDoc">Avant tout, se connecter</h4>
                        <p className="numberStepDoc">1</p>
                        <div className="onContentDocFirst">
                            <Link to="/connexion" className="connexionDocSortouch">Se connecter</Link>
                            <p className="orDocSortouch">ou</p>
                            <Link to="/inscription" className="inscriptionDocSortouch">s'inscription</Link>
                        </div>
                    </div>
                    :
                    <div className="contentDocSortouch">
                        <p className="numberStepDoc">1</p>
                        <p className="titleStepDoc">Vous êtes déja connecté, parfait !</p>
                    </div>}
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Créer son premier chatbot</h4>
                    <p className="numberStepDoc">2</p>
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Se rendre sur la page <Link to="/models">mes chatbots</Link></p>
                        <p className="textDocSortouch">Puis cliquer sur nouveau chatbot et créer son premier chatbot puis le selectionner</p>
                        <div className="containerImgDoc">
                            <img src={require('./image/add_model.png')} className="imgDocSortouch" alt="créer chatbot" />
                            <img src={require('./image/select_model.png')} className="imgDocSortouch" alt="select chatbot" />
                        </div>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Personnaliser son chatbot</h4>
                    <p className="numberStepDoc">3</p>
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Après selection du chatbot, se rendre sur <Link to="/editeur">l'éditeur</Link></p>
                        <p className="textDocSortouch">Un guide d'utilisation de l'éditeur est disponible <Link to="/editeur-doc">ici</Link></p>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Intégrer son chatbot à son site</h4>
                    <p className="numberStepDoc">4</p>
                    <div className="onContentDoc">
                        <p className="textDocSortouch">Intégrer son chatbot à son site wordpress <Link to="/installer-wordpress">ici</Link></p>
                        <p className="textDocSortouch">Intégrer son chatbot à son site ReactJs <Link to="/installer-react">ici</Link></p>
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Consultez les prises de contact avec vous via votre chatbot</h4>
                    <p className="numberStepDoc">5</p>
                    <div className="onContentDoc">
                        <p className="textDocSortouchLast">Vous pouvez retrouver tous vos message dans votre <Link to="/mails">boite de réception</Link></p>
                        <p className="textDocSortouch">Selectionner une catégorie de réception parmis celles que vous aurez créé</p>
                        <img src={require('./image/category.png')} className="imgDocSortouchCategory" alt="exemple category" />
                        <p className="textDocSortouch">Puis consulter les messages laissés par vos visiteurs</p>
                        <img src={require('./image/mail.png')} className="imgDocSortouchCategory" alt="exemple mail" />
                    </div>
                </div>
                <div className="contentDocSortouch">
                    <h4 className="titleStepDoc">Consultez votre base de connée d'email et de numéro de téléphone réceptionnés</h4>
                    <p className="numberStepDoc">6</p>
                    <div className="onContentDoc">
                        <p className="textDocSortouchLast">Vous pouvez retrouver votre base de donnée <Link to="/base-de-donnee">ici</Link></p>
                        <img src={require('./image/donnee.png')} className="imgDocSortouchDonnee" alt="exemple base de données" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocSortouch