import React, {useState, useEffect} from 'react';
import url from '../../../api/url';
import origin from '../../../api/origin';
import ContentEditable from 'react-contenteditable'
import useGlobalStateAddingCard from '../../../hooks/useGlobalStateAddingCard';
import '../question/question.css'
import './response.css'

const Question = () => {
  const [contentEditable] = useState(React.createRef())
  const [userId, setUserId] = useState()
  const [inputValue, setInputValue] = useState({html: ""})
  const { addingCard } = useGlobalStateAddingCard();
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


    const changeInput = (event) => {
      if(inputValue.html.split('').length < 200){
        setInputValue({ html: event.target.value })
    }
    }

    async function validResponse () {
      const name = inputValue.html.replace('&nbsp;', '')
      const valueResponse = {
        content : name,
        user_id : userId,
        model_id : modelId
      }
      console.log(valueResponse)
        try{
            fetch(url + '/response/add', {
              method: 'POST',
              headers: {
                'Content-Type' :'application/json',
                'Acces-Control-Allow-Origin' : {origin},
                'authorization': token
              },
              body: JSON.stringify(valueResponse)
            });
            addingCard()
          } catch (error)  {
            console.log(error);
          }
    }

    

    return(
       <div className="containerResponseBuild">
           <p className="textAddingResponse">Réponse</p>
           <ContentEditable
            className="contentQuestionInput"
            innerRef={contentEditable}
            html={inputValue.html}
            disabled={false}
            onChange={changeInput}
            tagName='article'
          />
           <button className="validResponse" onClick={validResponse}>Ajouter</button>
           
       </div>
    )
}

export default Question;