import React, {useEffect, useState} from 'react'

const Questionchat = (props) => {
    const [totalQuestion, setTotalQuestion] = useState([])
    

    useEffect(() => {
        printText(props.text)
    }, [props.text])


    const printText = (text) => {
        console.log(text)
        if(props.text){
            let index = 0
            let question = text.split('')
            console.log(question)
            let stockQuestion = []
            const questionPrint = setInterval(() => {
                stockQuestion = [...stockQuestion, question[index]]
                setTotalQuestion([...totalQuestion, stockQuestion])
                index++
                if(index === question.length){
                    clearInterval(questionPrint)
                    return(true)
                }
        }, 50)
        console.log(stockQuestion)
        }
    }

    return(
        <div className="contentQuestChat">
            <div className="contentTextQuestChat">
                <p className="textQuestChatbot">{totalQuestion}</p>
            </div>
        </div>
    )
}

export default Questionchat