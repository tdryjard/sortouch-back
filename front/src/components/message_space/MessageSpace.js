import React, { useEffect, useState } from 'react'
import AddCategory from './addCategory/AddCategory'
import url from '../../api/url'
import origin from '../../api/origin'
import useGlobalState from '../../hooks/useGlobalState';
import ContentEditable from 'react-contenteditable'
import LinkEditor from './linkEditor/LinkEditor'
import LinkChatBot from './linkChatBot/LinkchatBot';
import AreaMessage from './area_message/AreaMessage';
import useGlobalStateAddingCard from '../../hooks/useGlobalStateAddingCard';
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import './MessageSpace.css'

const MessageBox = (props) => {
    const [categorys, setCategorys] = useState([])
    const { classConnectButton } = useGlobalState();
    const [categoryId, setCategoryId] = useState()
    const [inputValue, setInputValue] = useState({ html: "" })
    const [contentEditable] = useState(React.createRef())
    const [categorySelect, setCategorySelect] = useState()
    const [unview, setUnview] = useState()
    const { addingCardState } = useGlobalStateAddingCard()
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [mobile, setMobile] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [token, setToken] = useState()
    const [categoryIndex, setCategoryIndex] = useState(0)

    useEffect(() => {
        if (window.innerWidth < 1280) setMobile(true)
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        if (sessionStorage.getItem('modelId')) {
            setModelId(sessionStorage.getItem('modelId'))
        }
    }, [])

    useEffect(() => {

    }, [categorys])

    useEffect(() => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                setCategorys(res)
                getNewMessage(res)
                if (!categorySelect && res[0]) setCategorySelect(res[0].id)
            })
    }, [classConnectButton, addingCardState, userId, modelId])

    const getNewMessage = async (categorys) => {
        console.log(categorys)
        let stockUnview = []
        if (categorys.length) {
            for (let n = 0; n < categorys.length; n++) {
                console.log(n)
                if (categorys[n]) {
                    const result = await fetch(`${url}/mail/find/${userId}/${modelId}/${categorys[n].id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Acces-Control-Allow-Origin': { origin },
                            'authorization': token
                        }
                    })
                    const resultJson = await result.json()
                    let nb = 0
                    for (let i = 0; i < resultJson.length; i++) {
                        if (resultJson[i].view === 0) nb++
                    }
                    stockUnview.push(nb)
                }
            }
            setTimeout(() => {
                setUnview(stockUnview)
            }, 200)
        }
    }

    const findAll = () => {
        fetch(`${url}/category/findAll/${userId}/${modelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow-Origin': { origin },
                'authorization': token
            }
        })
            .then(res => res.json())
            .then(res => setCategorys(res))
    }

    const deleteCategory = (event) => {
        if (window.confirm('voulez vous supprimer cette category ?')) {
            const categoryId = parseInt(event.target.id.replace('category', ''))
            fetch(`${url}/category/delete/${categoryId}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Acces-Control-Allow-Origin': { origin },
                    'authorization': token
                }
            })
            findAll()
        }
    }

    const updateCategoryActive = (id, name) => {
        setCategoryId(id)
        setInputValue({html: name})
    }

    const sendUpdate = () => {
        const name = inputValue.html.replace('&nbsp;', '')
        fetch(`${url}/category/update/${categoryId}/${userId}/${modelId}`, {
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
        setCategoryId(-1)
        findAll()
    }

    const changeInput = (event) => {
        if(inputValue.html.split('').length < 50){
            console.log(inputValue.html.split('').length)
            setInputValue({ html: event.target.value })

        }
    }



    return (
        <div className="containerMessageSpace">
            <Navbar type="mails" />
            {mobile && <img onClick={() => { setCategoryOpen(!categoryOpen) }} className="menuIcon" alt="menu burger" src={require('./image/menu_icon.png')} />}
            <div className={!mobile ? "containerOngletLeft" : mobile && categoryOpen ? "containerOngletLeftOpen" : "containerOngletLeftClose"}>
            {Array.isArray(categorys) && <p className="titleCategoryOnglet">Catégories de réception</p>}
                {Array.isArray(categorys) ?
                    categorys.map((category, index) => {
                        return (
                            <div onClick={() => { setCategoryIndex(index); setCategorySelect(category.id); setCategoryOpen(!categoryOpen) }} className="contentCategory">
                                {category.id !== categoryId ?
                                    <div className="contentUnderCategory">
                                        <p className="titleCategory">{category.name}</p>
                                        <div className="contentIconCategory">
                                            {unview &&
                                                <div className="contentNewMessage">
                                                    <img src={require('./image/newMessage_icon.png')} className="newMessageIcon" alt="new message" />
                                                    <p className="nbNewMessage">{unview[index]}</p>
                                                </div>}
                                            <img alt="update icon" src={require('./image/update_icon.png')} id={`category${category.id}`} className='iconCategory' onClick={() => {updateCategoryActive(category.id, category.name)}} />
                                            <img alt="delete icon" src={require('./image/delete_icon.png')} id={`category${category.id}`} className="iconCategory" onClick={deleteCategory} />
                                        </div>
                                    </div>
                                    :
                                    <div className="contentUnderCategoryUpdate">
                                        <ContentEditable
                                            className="inputAddCategory"
                                            innerRef={contentEditable}
                                            html={inputValue.html}
                                            disabled={false}
                                            onChange={changeInput}
                                            tagName='article'
                                        />
                                        <button onClick={sendUpdate} className="buttonAddCategory">Valider</button>
                                    </div>}
                            </div>
                        )
                    })
                :
                <p className="textNoCategory">Créez votre premier chatbot grace à <Link to="/editeur">l'éditeur</Link></p>}
            </div>
            <AreaMessage token={token} userId={userId} modelId={modelId} categoryName={categorys[categoryIndex] && categorys[categoryIndex].name} userId={userId} categoryId={categorySelect} />
        </div>
    )
}

export default MessageBox;