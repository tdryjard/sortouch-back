import React, {useState, useEffect} from 'react'
import './CardListCategory.css'
import url from '../../../../../api/url';
import origin from '../../../../../api/origin';
import useGlobalState from '../../../../../hooks/useGlobalState';

const CardListDestination = (props) => {
    const [classJoinDest, setClassJoinDest] = useState('joinIconDest')
    const { connectClassActive, classConnectButton } = useGlobalState();
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

    const joinCategory = () => {
        setClassJoinDest('joinIconDestActive')
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
                  category_id : props.id,
                  onChange : true,
                  user_id : userId,
                  model_id : modelId
              })
            });
          } catch (error)  {
            console.log(error);
          }
    }

    onmousedown = function(event) {
        setClassJoinDest('joinIconDest')
    }

    


    return(
        <div className="containerCardListCategory">
            <img onClick={joinCategory} src={require('../image/join_icon.png')} className={classJoinDest}/>
            <p className="nameCardCategory">{props.name}</p>
        </div>
    )
}

export default CardListDestination;