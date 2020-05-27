import React, {useState, useEffect} from 'react'
import url from '../../../api/url';
import Questionchat from '../questionBlock/QuestionChat';
import FormContact from '../fromContact/FormContact';
import Chatbot from 'sortouch-react'
import './ChatBotArea.scss'

const ChatBotArea = () => {
    
    const [containers, setContainers] = useState([])
    const [cardsQuest, setCardsQuest] = useState([])
    const [cardsRes, setCardsRes] = useState([])
    const [cardsCategory, setCardsCategory] = useState([])
    const [responseSelect, setResponseSelect] = useState(0)
    const [storageContainers, setStorageContainers] = useState()
    const [responseSelected, setResponseSelected] = useState([])
    const [pair, setPair] = useState(false)
    const [modelId, setModelId] = useState()
    const [userId, setUserId] = useState()
    const [cardsQuestFilter, setCardsQuestFilter] = useState([])

    useEffect(() => {
        const stockUrl = String(window.location.href).split('')
        let detect = 0
        let nb1 = 0
        let nb2 = 0
        for(let i = 0; i < stockUrl.length; i++){
            if(stockUrl[i] === 'w'){
                detect = 1
            }
            if(stockUrl[i + 1] === '&'){
                detect = 2
            }
            if(detect === 1){
                nb1 = nb1 + stockUrl[i + 1]
            }
            if(detect === 2){
                nb2 += stockUrl[i]
            }
        }
        setUserId((parseInt(nb1.split('0')[1]) - 150)/48*16)
        setModelId((parseInt(nb2.split('&')[1]) - 150)/8*4)
    }, [])

    useEffect(() => {
        printContainers()
    },[userId, modelId, responseSelected])

    const printContainers = async () => {
        try{
            fetch(`${url}/container/findAll/${userId}/${responseSelect}/${modelId}`)
            .then(res => res.json())
            .then(res => {
                if(res.length){
                    if(storageContainers){
                        let resResult = res.filter(res => res.response_id != null)
                        let newContainer = [...storageContainers, ...resResult]
                        setContainers(newContainer)
                        takeCard(newContainer)
                    } else {
                        console.log(res)
                        setContainers(res)
                        takeCard(res)
                    }
                }
            })
            
            
        } catch(error) {
            console.log(error)
        }
        if(containers.length){
            setStorageContainers(containers)

        }
    }

    const takeCard = async (res) => {
        let stock = []
        for(let i = 0; i < res.length + 3; i++){
            if(res[i]){
                let resulted = await fetch(`${url}/relation/findCardQuestion/${res[i].id}/${userId}/${modelId}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type' :'application/json'
                    }
                })
                const result = await resulted.json()
                stock = [...stock, result]
            }
        }
        if(stock.length){

        setCardsQuest(stock)
        const stockFilter = await stock.filter(quest => quest[0])
        setCardsQuestFilter(stockFilter)

        }


        let stockRes = []
        for(let i = 0; i < res.length + 3; i++){
            if(res[i]){
                let resulted = await fetch(`${url}/relation/findCardResponse/${res[i].id}/${userId}/${modelId}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type' :'application/json'
                    }
                })
                const result = await resulted.json()
                stockRes = [...stockRes, result]
            }
        }
        setCardsRes(stockRes)
        let stockCategory = []
        for(let i = 0; i < res.length + 3; i++){
            if(typeof res[i] === 'object'){
                let resulted = await fetch(`${url}/relation/findCardCategory/${res[i].id}/${userId}/${modelId}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type' :'application/json'
                    }
                })
                const result = await resulted.json()
                stockCategory = [...stockCategory, result]
            }
        }
        setCardsCategory(stockCategory)
    }

    const selectResponse = async function (cardId, index) {
        setPair(!pair)
        const stockContainers = containers
        const numberCard = cardId
        const containerIndex = index + 1
        setResponseSelect(numberCard)

        

        responseSelected.length = cardId
        stockContainers.length = containerIndex

        
        let stockResponseSelected = ([...responseSelected, numberCard])

            for(let a = 0; a < cardsRes.length; a++){
                if(cardsRes[a].length){
                    for(let b = 0; b < cardsRes[a].length; b++){
                            for(let c = 0; c < stockResponseSelected.length; c++){
                                const nbRes = cardsRes[a].filter(card => stockResponseSelected.includes(card.id))
                                if(nbRes.length > 1){
                                    for(let i = 0; i < stockResponseSelected.length; i++){
                                        for(let a = 0; a < nbRes.length - 1; a++){
                                            if(nbRes[a].id === (stockResponseSelected[i])){
                                                stockResponseSelected.splice(i, 1)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        setResponseSelected(stockResponseSelected)

        setStorageContainers(stockContainers)

        if(stockContainers){
            printContainers()
        }

        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight);
        }, 700)
    }
    
    console.log(userId, modelId)
    

    return(
        <div className="containerAreaChatBot">
            {Array.isArray(containers) &&
            containers.map((container, index) => {
                return(
                    <div className={container.content_type === "question" && index%3 !== 0 ? "contentQuestionChat" : container.content_type === "question" && index%3 === 0 ? "contentQuestionChatDecale" : container.content_type === "response" ? "contentResponseChatPage" : "contentDestinationChat"}>
                            {Array.isArray(cardsQuest[index]) && container.content_type === "question" &&
                                cardsQuest[index].map(card => {
                                    return(
                                        cardsQuestFilter[cardsQuestFilter.length - 1] && card.id === cardsQuestFilter[cardsQuestFilter.length - 1][0].id ?
                                        <Questionchat text={card.content}/>
                                        :
                                        <p className="textQuestChatbot">{card.content}</p>
                                    )
                                })}
                            {Array.isArray(cardsRes[index]) && container.content_type === "response" &&
                                cardsRes[index].map(card => {
                                    return(
                                        <div onClick={() => {selectResponse(card.id, index)}}   className={responseSelected.includes(card.id) ? 'containerCardResChatActive' : 'containerCardResChat'}>
                                            <p id={`container${index}`} className="textCardResChat">{card.content}</p>
                                        </div>)
                                        })
                                    }
                            {Array.isArray(cardsCategory[index]) && container.content_type === "category" &&
                                cardsCategory[index].map(card => {
                                    return(
                                        <FormContact categoryId={card.id} userId={userId} modelId={modelId} />
                                    )
                                })}
                    </div>
                )
            })}
            <Chatbot userId={userId} modelId={modelId}/>
        </div>
    )
}

export default ChatBotArea