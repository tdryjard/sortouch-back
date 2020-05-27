import React, {useState} from 'react'
import url from '../../../api/url'
import './FormContact.scss'

const FormContact = (props) => {
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(phone)
    }

    const takePhone = (event) => {
        setPhone(event.target.value)
    }

    const takeEmail = (event) => {
        setEmail(event.target.value)
    }

    const sendMail = () => {
        if(!validateEmail(email)){
            alert('email non valide')
        } else if (!validatePhone(phone)){
            alert('numéro de téléphone non valide')
        } else {
            fetch(url + '/mail/create', {
                method: 'POST',
                headers: {
                    'Content-Type' :'application/json',
                    'Acces-Control-Allow-Origin' : {origin}
                },
                body: JSON.stringify({
                    phone : phone,
                    email : email,
                    message: message,
                    category_id : props.categoryId,
                    model_id : props.modelId,
                    user_id : props.userId,
                    view: 0
                    })
                });
        }
    }

    const getMessage = (e) => {
        setMessage(e.target.value)
    }
    

    return(
        <div className="containerForm">
            <div className="contentHeadForm">
                <input onChange={takeEmail} type="text" className="emailForm" placeholder="email"/>
                <input onChange={takePhone} type="text" className="phoneForm" placeholder="numéro de téléphone"/>
                <img src={require('../chatbotArea/image/backForm.svg')} alt="icon form" className="imgForm"/>
            </div>
            <textarea className="inputMessageForm" placeholder="message" onChange={getMessage}/>
          <button onClick={sendMail} className="sendFormButton">Envoyer !</button>
        </div>
    )
}

export default FormContact