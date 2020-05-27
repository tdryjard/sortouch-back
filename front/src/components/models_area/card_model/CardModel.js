import React, { useRef, useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'
import url from '../../../api/url'
import origin from '../../../api/origin'
import { Redirect } from 'react-router-dom'
import './CardModel.scss'


const CardModel = (props) => {
    const [optionSelected, setOptionSelected] = useState(false)
    const [inputValue, setInputValue] = useState({ html: props.name })
    const [contentEditable] = useState(React.createRef())
    const [unview, setUnview] = useState([])
    const [categorys, setCategorys] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()
    const [redirectEditor, setRedirectEditor] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        setTimeout(() => {

        }, 300)
    }, [])


    const linkRef = useRef(null);

    const changeInput = (event) => {
        if(inputValue.html.split('').length < 200){
            setInputValue({ html: event.target.value })
        }
    }

    useEffect(() => {
        fetch(`${url}/category/findAll/${userId}/${props.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            }})
            .then(res => res.json())
            .then(res => setCategorys(res))
    }, [props.id, userId, token])

    useEffect(() => {
        let stockUnview = []
        console.log(categorys)
        for (let n = 0; n < categorys.length; n++) {
            fetch(`${url}/mail/find/${userId}/${props.id}/${categorys[n].id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            }})
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    let nb = 0
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].view === 0) nb++
                    }
                    stockUnview.push(nb)
                })
        }
        setTimeout(() => {
            let nbTT = 0
            for (let i = 0; i < stockUnview.length; i++) {
                nbTT += stockUnview[i]
            }
            setUnview(nbTT)
        }, 200)
    }, [categorys, userId, props.id, token])

    console.log(unview)

    const deleteModel = (event) => {
        if (window.confirm('voulez vous supprimer ce model ?')) {
            const modelId = parseInt(event.target.id.replace('model', ''))
            fetch(`${url}/model/delete/${modelId}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
        }
        window.location.reload()
    }

    const updateModel = (event) => {
        const name = inputValue.html.replace('&nbsp;', '')
        const modelId = parseInt(event.target.id.replace('model', ''))
        console.log(`${url}/model/update/${modelId}/${userId}`)
        fetch(`${url}/model/update/${modelId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            },
            body: JSON.stringify({
                name: name
            })
        })
        window.location.reload()
    }

    const cardSelect = () => {
        sessionStorage.setItem('modelId', props.id)
        setTimeout(() => {
            setRedirect(true)
        }, 1000)
    }

    const cardSelectToEditor = () => {
        sessionStorage.setItem('modelId', props.id)
        setTimeout(() => {
            setRedirectEditor(true)
        }, 1000)
    }

    return (
        <>
            {optionSelected === false ?
                <div onClick={() => { window.innerWidth < 1280 && cardSelect() }} className={props.index === 0 ? "contentCardModelFirst" : "contentCardModel"}>
                    <div className="headCardModel">
                        <div className="contentNewMessageModel">
                            <img src={require('../../message_space/image/newMessage_icon.png')} className="newMessageIconModel" alt="new message" />
                            <p className="nbNewMessageModel">{unview}</p>
                        </div>
                    </div>
                    <div className="infoCardModel">
                                <img onClick={() => { setOptionSelected(true) }} className="optionIcon" src={require('./image/option_icon.png')} alt="option" />
                        <div className="contentNameCardModel"><p className="nameCardModel">{props.name}</p></div>
                        {redirect && <Redirect
                            state={props.id} to="/mails" />}
                        {redirectEditor && <Redirect
                            state={props.id} to="/editeur" />}
                        <button onClick={cardSelect} className="buttonSelectModel">Boite de réception</button>
                        <button onClick={cardSelectToEditor} className="buttonSelectModel">Modifier</button>
                    </div>
                </div>
                :
                <div className={props.index === 0 ? "contentCardModelOptionFirst" : "contentCardModelOption"}>
                    <div className="containerHeadoptionCardModel">
                        <p className="modelId">chatbot id : {props.id}</p>
                        <img onClick={() => { setOptionSelected(false) }} className="croixIcon" src={require('./image/croix_icon.png')} alt="option" />
                    </div>
                    <ContentEditable
                        className="inputAddModel"
                        innerRef={contentEditable}
                        html={inputValue.html}
                        disabled={false}
                        onChange={changeInput}
                        tagName='article'
                    />
                    <button onClick={updateModel} id={`model${props.id}`} className="buttonUpdateModel">Valider changement</button>
                    <button id={`model${props.id}`} className="deleteButton" onClick={deleteModel}>Supprimer le model</button>
                </div>}
        </>
    )
}

export default CardModel