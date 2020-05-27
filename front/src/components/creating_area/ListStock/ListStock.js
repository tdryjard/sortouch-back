import React, {useState, useEffect} from "react";
import url from '../../../api/url';
import CardListQuestion from './cardList/CardListQuestion/CardListQuestion';
import CardListResponse from './cardList/CardListResponse/CardListResponse';
import CardListCategory from './cardList/CardListCategory/CardListCategory';
import useGlobalStateAddingCard from '../../../hooks/useGlobalStateAddingCard';
import Question from '../question/Question'
import Response from '../response/Response'
import './ListStock.css'
import AddCategory from "./cardList/CardListCategory/addCategory/AddCategory";

const Area = () => {
  const [classButtonQuestion, setClassButtonQuestion] = useState('buttonQuestion')
  const [classButtonResponse, setClassButtonResponse] = useState('buttonResponse')
  const [classButtonDestination, setClassButtonDestination] = useState('buttonDestination')
  const [nameSection, setNameSection] = useState('Questions')
  const [questions, setQuestions] = useState()
  const [responses, setResponses] = useState()
  const [categorys, setCategorys] = useState()
  const [selected, setSelected] = useState(-1)
  const {addingCardFinish, addingCardState} = useGlobalStateAddingCard()
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
    setClassButtonQuestion('buttonQuestionActive');
    setClassButtonResponse('buttonResponse');
    setClassButtonDestination('buttonDestination');
    setNameSection('Questions')
    setResponses(null)
    setCategorys(null)

    fetch(`${url}/question/findAll/${userId}/${modelId}`)
    .then(res => res.json())
    .then(res => {setQuestions(res)})
  }, [userId, modelId])

  const changeToQuestions = () => {
    setClassButtonQuestion('buttonQuestionActive');
    setClassButtonResponse('buttonResponse');
    setClassButtonDestination('buttonDestination');
    setNameSection('Questions')
    setResponses(null)
    setCategorys(null)

    fetch(`${url}/question/findAll/${userId}/${modelId}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        setQuestions(res)})
  }

  const changeToResponse = () => {
    setClassButtonResponse('buttonResponseActive');
    setClassButtonQuestion('buttonQuestion');
    setClassButtonDestination('buttonDestination');
    setNameSection('Réponses')
    setQuestions(null)
    setCategorys(null)

    fetch(`${url}/response/findAll/${userId}/${modelId}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        setResponses(res)})
  }

  const changeToDestination = () => {
    setClassButtonDestination('buttonDestinationActive');
    setClassButtonQuestion('buttonQuestion');
    setClassButtonResponse('buttonResponse');
    setNameSection('Destinations')
    setQuestions(null)
    setResponses(null)

      fetch(`${url}/category/findAll/${userId}/${modelId}`,  {
        method: 'GET',
        headers: {
          'Content-Type' :'application/json',
          'Acces-Control-Allow-Origin' : {origin},
          'authorization': token
        }})
      .then(res => res.json())
      .then(res => setCategorys(res))
  }

  useEffect(() => {
    addingCardFinish()

    if(responses){
      fetch(`${url}/response/findAll/${userId}/${modelId}`)
      .then(res => res.json())
      .then(res => {setResponses(res)})
    }
    

    if(categorys){
      fetch(`${url}/category/findAll/${userId}/${modelId}`,  {
        method: 'GET',
        headers: {
          'Content-Type' :'application/json',
          'Acces-Control-Allow-Origin' : {origin},
          'authorization': token
        }})
      .then(res => res.json())
      .then(res => setCategorys(res))
    }

    if(questions){
      fetch(`${url}/question/findAll/${userId}/${modelId}`)
      .then(res => res.json())
      .then(res => {setQuestions(res)})
    }
    
  },[addingCardState, userId, modelId])


  return(
        <div className="containerListStock">
            <div className="headList">
              <p className="textHeadList">{nameSection}</p>
              <div className="containerButtonSection">
                  <button className={classButtonQuestion} onClick={changeToQuestions}>Questions</button>
                  <button className={classButtonResponse} onClick={changeToResponse}>Réponses</button>
                  <button className={classButtonDestination} onClick={changeToDestination}>Catégories</button>
              </div>
            </div>
            <div className="containerList">
                {nameSection === "Questions" &&
                <Question/>}
                {nameSection === "Réponses" &&
                <Response/>}
                {Array.isArray(questions) &&
                 questions.map(question => {
                   return(
                    <CardListQuestion id={question.id} content={question.content} changeSelected={() => setSelected(question.id)} selected={selected}/>
                   )
                })}
                {Array.isArray(responses) &&
                 responses.map(response => {
                   return(
                    <CardListResponse id={response.id} content={response.content}/>
                   )
                })}
                {nameSection === "Destinations" && <AddCategory/>}
                {Array.isArray(categorys) &&
                 categorys.map(category => {
                   return(
                    <CardListCategory id={category.id} name={category.name}/>
                   )
                })}
            </div>
        </div>
  );
};

export default Area;