import React, { useEffect, useRef, useState } from 'react'
import url from '../../../api/url'
import useGlobalStateAddingCard from '../../../hooks/useGlobalStateAddingCard';
import './AreaMessage.scss'

const AreaMessage = (props) => {
    const [mails, setMails] = useState([])
    const [seeContact, setSeeContact] = useState(null)
    const [mailSelect, setMailSelect] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const {addingCardFinish, addingCard, addingCardState} = useGlobalStateAddingCard()
    const [mobile, setMobile] = useState(false)
    const [copied, setCopied] = useState(false)
    const [mailView, setMailView] = useState(false)
    const [phoneView, setPhoneView] = useState(false)

    useEffect(() => {
        fetch(`${url}/mail/find/${props.userId}/${props.modelId}/${props.categoryId}`, {
            method: 'GET',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': props.token }
        })
        .then(res => res.json())
        .then(res => setMails(res))
    }, [props.categoryId, props.userId, props.modelId, mailSelect, deleted])

    const linkRef = useRef(null);

    useEffect(() => {
        if(window.innerWidth < 1280) setMobile(true)
        console.log(window.innerWidth)
    }, [])

    const disableSeeMail = () => {
        setSeeContact(null)
        setMailSelect(null)
    }

    const clickMail = (index, mailId) => {
        if(addingCardState){
            addingCardFinish()
        } else {
            addingCard()
        }
        setMailSelect(index)
        fetch(`${url}/mail/update/${props.userId}/${props.modelId}/${props.categoryId}/${mailId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': `${origin}`,
              'authorization': props.token
            },
            body: JSON.stringify({
                view : 1
            })
        })
    }

    const deleteMail = (mailId) => {
        if(window.confirm('voulez vous supprimer ce model ?')){
        fetch(`${url}/mail/delete/${mailId}/${props.userId}/${props.modelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${origin}`,
                'authorization': props.token
            }
        })
        setDeleted(!deleted)
        if(addingCardState){
            addingCardFinish()
        } else {
            addingCard()
        }
    }
}

    return(
        <div className="messageContainer">
            <div className="containerTitleCategoryMail">
                <p className="titleMessageOnglet">{props.categoryName}</p>
            </div>
            {Array.isArray(mails) && mailSelect === null &&
            mails.map((mail, index) => {
                console.log(mail)
                return(
                <div>
                    {index !== seeContact ?
                    <div className={mail.view === 1 ? "littleContentMail" : "littleContentMailUnview"}>
                        <div className="contentDeleteMail">
                            <img onClick={() => deleteMail(mail.id)} src={require('../image/dustbin_icon.png')} alt="delete icon" className="deleteIconMail"/>
                        </div>
                        <div onClick={() => {clickMail(index, mail.id)}} className="contentLittleMessageMail">
                            <p className="littleMessageMail" id={`mail${index}${mail.category_id}${mail.id}`} onClick={() => {clickMail(index, mail.id)}}>{mail.message}</p>
                        </div>
                        <div className="contentContactIcon">
                            <img alt="contact icon" src={require('../image/contactIcon.png')} className="contactIcon" onClick={() => {setSeeContact(index)}}/>
                        </div>
                    </div>
                :
                    <div className="littleContentMail">
                            {!mailView &&
                            <>
                            <img alt="phone" id={`mail${index}${mail.category_id}${mail.id}`} onClick={() => {setPhoneView(!phoneView)}} src={require('../image/phone_icon.png')} className="phoneIcon"/>
                            <p id={`mail${index}${mail.category_id}${mail.id}`} onClick={() => {setPhoneView(!phoneView)}} className="littleMessageMail">{mail.phone}</p>
                            </>}
                            {!phoneView &&
                            <>
                            <img alt="mail" id={`mail${index}${mail.category_id}${mail.id}`} onClick={() => {setMailView(!mailView)}} src={require('../image/mail_icon.png')} className="mailIcon"/>
                            <p id={`mail${index}${mail.category_id}${mail.id}`} onClick={() => {setMailView(!mailView)}} className="littleMessageMail">{mail.email}</p>
                            </>}
                            <div className="contentContactIcon">
                                <img alt="back" src={require('../image/back_icon.png')} className="backIcon" onClick={() => {setSeeContact(null)}}/>
                            </div>
                    </div>}
                </div>
                )})}
            {mails[mailSelect] && mailSelect !== null &&
                <div className="contentMail">
                    <div className="littleContentMailNoHover">
                            {!mailView &&
                            <>
                            <img alt="phone" onClick={() => {setPhoneView(!phoneView)}} src={require('../image/phone_icon.png')} className="phoneIcon"/>
                            <p onClick={() => {setPhoneView(!phoneView)}} className="littleMessageMail">{mails[mailSelect].phone}</p>
                            </>}
                            {!phoneView &&
                            <>
                            <img alt="mail" onClick={() => {setMailView(!mailView)}} src={require('../image/mail_icon.png')} className="mailIcon"/>
                            <p onClick={() => {setMailView(!mailView)}} className="littleMessageMail">{mails[mailSelect].email}</p>
                            </>}

                            <div className="contentContactIcon">
                                <img alt="back" src={require('../image/back_icon.png')} className="backIcon" onClick={disableSeeMail}/>
                            </div>
                    </div>
                    <div className="contentMessage">
                        <p className="messageMail">{mails[mailSelect].message}</p>
                    </div>
                </div>
            }
            {!Array.isArray(mails) && <p className="textNoMessage">Encore aucune prise de contact reçues dans cette catégorie</p>}
            </div>
    )
}

export default AreaMessage