import React from 'react'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import './docShare.scss'

const DocShare = () => {
    return(
        <div className="containerDoc">
            {window.innerWidth > 1280 && <Navbar type={"doc"}/>}
            {window.innerWidth > 1280 && <Menu link="editor"/>}
            {window.innerWidth < 1280 && <MenuBurger link="editor"/>}
            <div className="contentDoc">
                <h1 className="titleDoc">Partager votre Chatbot hébergé</h1>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Liens dans l'espace model <p className="boldText">sur ordinateur</p></h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Vous pouvez retrouver le liens de votre chatbot hébergé dans votre espace model, survolez simplement le model du chatbot à partager et cliquez sur copier</p>
                        <img className="imgCategoryDoc" src={require('./image/link_pc.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Liens dans l'espace model <p className="boldText">sur mobile</p></h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Sur mobile, le liens de votre chatbot se trouve dans votre espace message du model concerné, selectionnez le model du chatbot à partager et retrouvez le liens en bas de votre espace message</p>
                        <img className="imglinkMobileDoc" src={require('./image/link_mobile.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DocShare