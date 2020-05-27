import React from 'react'
import Menu from '../menu/Menu'
import MenuBurger from '../burgerMenu/BurgerMenu'
import Navbar from '../../navbar/Navbar'
import './DocEditor.scss'

const DocEditor = () => {
    return(
        <div className="containerDoc">
            {window.innerWidth > 1280 && <Navbar type={"doc"}/>}
            {window.innerWidth > 1280 && <Menu link="editor"/>}
            {window.innerWidth < 1280 && <MenuBurger link="editor"/>}
            <div className="contentDoc">
                <h1 className="titleDoc">Apprenez facilement à utiliser notre éditeur de chatbot</h1>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Choisir une catégorie d'interraction à ajouter</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Vous pouvez naviguer entre les sections questions, réponses et boite de réception en appuyant sur ces différents bouton</p>
                        <img className="imgCategoryDoc" src={require('./image/category.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une question</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Il va falloir que votre chatbot pose des questions, pour cela, rien de plus simple d'en créer. Se rendre dans la section question, taper sa question et appuyer sur ajouter. Votre question est ajoutée en bas de votre section.</p>
                        <img className="imgQuestionDoc" src={require('./image/question.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une réponses</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Exactement comme pour les questions, votre chatbot aura besoin de différentes réponses possible afin de diriger vos visiteurs au bon endroit. Ajouter le nom de la réponse, appuyer sur ajouter puis retourver sa réponse en bas de la section</p>
                        <img className="imgQuestionDoc" src={require('./image/response.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une boite de réception</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionDoc">Une fois qu'assez de questions, réponses auront été placés afind e cibler le besoin de l'utilisateur, il vous faudra le rediriger vers un formulaire lié à la bonne catégorie de réception. Pour cela, comme pour les questions et réponse, écrire le nom de la catégorie et appuer sur ajouter.</p>
                        <img className="imgQuestionDoc" src={require('./image/destination.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Ajouter une interraction</h4>
                    <div className="contentSectionDocColumn">
                        <p className="textContainerSectionColumnDoc">Un chatbot se constitue en plusieurs interraction, afin d'ajouter une terraction dans l'éditeur il faut simplement appuyer sur le bouton d'ajout du type d'interraction désiré</p>
                        <img className="imgAddContainerDoc" src={require('./image/add_container.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
                <div className="containerSectionDoc">
                    <h4 className="titleContainerSectionDoc">Lier une question, réponse ou boite de destination à un un contenaire d'interaction</h4>
                    <div className="contentSectionDoc">
                        <p className="textContainerSectionJoinDoc">Afin de lier les deux, il faut simplement appuyer sur l'icon <img src={require('../../creating_area/builder/image/connect_icon.png')} alt="joindre" className="joinIconText"/> de l'interraction à ajouter et sur le contenaire avec lequel l'on veut le lier </p>
                        <img className="imgJoinDoc" src={require('./image/join.png')} alt="category cartes éditeur"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocEditor