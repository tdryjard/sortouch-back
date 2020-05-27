import React, { useState, useEffect } from 'react'
import './CardListQuestion.css'
import url from '../../../../../api/url';
import origin from '../../../../../api/origin';
import ContentEditable from 'react-contenteditable'
import useGlobalState from '../../../../../hooks/useGlobalState';
import useGlobalStateAddingCard from '../../../../../hooks/useGlobalStateAddingCard';

const CardListQuestion = (props) => {
    const [contentEditable] = useState(React.createRef())
    const [inputValue, setInputValue] = useState({ html: props.content })
    const [updating, setUpdating] = useState(false)
    const { connectClassActive } = useGlobalState();
    const {addingCard} = useGlobalStateAddingCard()
    const [userId, setUserId] = useState()
    const [modelId, setModelId] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        if(localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
            setToken(localStorage.getItem('token'))
        } else {
            setUserId(sessionStorage.getItem('userId'))
            setToken(sessionStorage.getItem('token'))
        }
        setModelId(sessionStorage.getItem('modelId'))
    }, [])

    useEffect(() => {

    }, [userId, modelId])


    const deleteQuestion = async () => {
        if(window.confirm(`es tu sûrs de vouloir supprimer la question ${props.content} ?`)){
            fetch(`${url}/relation/deleteAllRelationQuestion/${props.id}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type' :'application/json',
                  'Acces-Control-Allow-Origin' : {origin},
                  'authorization': token
                }
            })
            fetch(`${url}/question/delete/${props.id}/${userId}/${modelId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type' :'application/json',
                  'Acces-Control-Allow-Origin' : {origin},
                  'authorization': token
                }
            })
            addingCard()
        }
    }

    const changeInput = (event) => {
        if(inputValue.html.split('').length < 200){
            setInputValue({ html: event.target.value })
        }
    }

    const updateQuestion = (name) => {
        setUpdating(true)
        setInputValue({html: name})
    }

    const validUpdateQuestion = () => {
        const name = inputValue.html.replace('&nbsp;', '')
        fetch(`${url}/question/update/${props.id}/${userId}/${modelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': token
            },
            body: JSON.stringify({
                content: name
            })
        })
        addingCard()
        setUpdating(false)
    }

    const joinQuestion = () => {
        connectClassActive()
        try{
            fetch(`${url}/relation/add`, {
              method: 'POST',
              headers: {
                'Content-Type' :'application/json',
                'Acces-Control-Allow-Origin' : {origin},
                'authorization': token
              },
              body: JSON.stringify({
                  question_id : props.id,
                  onChange : true,
                  user_id : userId,
                  model_id: modelId
              })
            });
          } catch (error)  {
            console.log(error);
          }
    }

    onmousedown = function (event) {
        props.changeSelected(-1)
    }

return (
    <div className="containerCardList">

        {updating === false ?
        <div className="contentCardList">
            <p className="textTitleCard">{props.content}</p>
            <div className="containerIcon">
                <img alt="join icon" onClick={joinQuestion} src={require('../image/join_icon.png')} className={props.selected === props.id ? "joinIconActive" : "joinIcon"} />
                <img alt="update icon" onClick={() => {updateQuestion(props.content)}} src={require('../image/update_icon.png')} className="updateIcon" />
                <img alt="delete icon" onClick={deleteQuestion} src={require('../image/delete_icon.png')} className="deleteIcon" />
            </div>
        </div>
        :
        <div className="contentCardList">
            <ContentEditable
                className="contentQuestionInputCard"
                innerRef={contentEditable}
                html={inputValue.html}
                disabled={false}
                onChange={changeInput}
                tagName='article'
            />
            <button onClick={validUpdateQuestion} className="validUpdateCard">Valider</button>
        </div>
        }
    </div>
)
}

export default CardListQuestion;