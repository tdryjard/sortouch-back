import React, {useState, useEffect} from 'react'
import url from '../../../api/url'
import origin from '../../../api/origin'
import useGlobalState from '../../../hooks/useGlobalState'
import ContentEditable from 'react-contenteditable'
import './CreateModel.scss'


const CreateModel = () => {
    const [adding, setAdding] = useState(false)
    const [inputValue, setInputValue] = useState({html: "nouveau model"})
    const [contentEditable] = useState(React.createRef())
    const [send, setSend] = useState(false)
    const { connectClassActive, connectClassDisable, classConnectButton } = useGlobalState();
    const [userId, setUserId] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
    }, [])


    const changeInput = (event) => {
        if(inputValue.html.split('').length < 100){
            setInputValue({ html: event.target.value })
        }
    }

    const addModel = () => {
        const name = inputValue.html.replace('&nbsp;', '')
        fetch(url + '/model/add', {
            method: 'POST',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': token
            },
            body: JSON.stringify({
                name : name,
                user_id : userId
            })
          });
        setTimeout(() => {
            setSend(true)
        }, 200)
        if(classConnectButton === 'imgConnectActive'){
            connectClassDisable()
        } else {
            connectClassActive()
        }
        window.location.reload()
    }

    const activeContent = () => {
        setTimeout(() => {
            setAdding(true)
        },200)
    }

    return(
        <div className="containerAddModel">
            {adding === false && send !== true ?
                <div onClick={activeContent} className="contentAddModel">
                    <p onClick={activeContent} className="textCategory">Nouveau chatbot</p>
                    <div className="contentShine">
                        <img alt="add" onClick={activeContent} src={require('../../message_space/addCategory/image/plus_icon.png')} className="addButtonCategory"/>
                        <div className="shine"/>
                    </div>
                </div>
            : adding === true && send !== true ?
                <div className="contentAddModelActive">
                    <p className="textCategory">Entrez le nom du model</p>
                    <ContentEditable
                        className="inputAddModel"
                        innerRef={contentEditable}
                        html={inputValue.html}
                        disabled={false}
                        onChange={changeInput}
                        tagName='article'
                    />
                    <button onClick={addModel} className="buttonAddModel">Ajouter</button>
                </div>
            : 
                <div className="contentAddModelActive">
                    <div className="contentSetTimeout">
                        {setTimeout(() => {setSend(false); setAdding(false)}, 1500)}
                    </div>
                    <p className="textCategory">Model créé !</p>
                </div>}
        </div>
    )
}

export default CreateModel