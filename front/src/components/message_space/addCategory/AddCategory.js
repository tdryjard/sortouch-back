import React, {useState} from 'react'
import url from '../../../api/url'
import origin from '../../../api/origin'
import ContentEditable from 'react-contenteditable'
import useGlobalState from '../../../hooks/useGlobalState';
import './AddCategory.scss'

const AddCategory = (props) => {
    const [adding, setAdding] = useState(false)
    const [nameCategory] = useState('')
    const [inputValue, setInputValue] = useState({html: ""})
    const [contentEditable] = useState(React.createRef())
    const [send, setSend] = useState(false)
    const { connectClassActive, connectClassDisable, classConnectButton } = useGlobalState();
    const modelId = props.modelId

    console.log(nameCategory)

    const changeInput = (event) => {
        setInputValue({html: event.target.value})
    }

    const addCategory = () => {
        fetch(url + '/category/add', {
            method: 'POST',
            headers: {
              'Content-Type' :'application/json',
              'Acces-Control-Allow-Origin' : {origin},
              'authorization': props.token
            },
            body: JSON.stringify({
                name : inputValue.html,
                user_id : props.userId,
                model_id : modelId
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
    }

    const activeContent = () => {
        setTimeout(() => {
            setAdding(true)
        },200)
    }

    return(
        <div className="contentAddCategory">
            {adding === false && send !== true ?
                <div onClick={activeContent} className="contentUnderAddCategory">
                    <p onClick={activeContent} className="textCategory">Ajouter catégorie</p>
                    <div className="contentShine">
                        <img alt="add icon" onClick={activeContent} src={require('./image/plus_icon.png')} className="addButtonCategory"/>
                        <div className="shine"/>
                    </div>
                </div>
            : adding === true && send !== true ?
                <div className="contentAddCategoryActive">
                    <p className="textCategory">Entrez le nom de la catégorie</p>
                    <ContentEditable
                        className="inputAddCategory"
                        innerRef={contentEditable}
                        html={inputValue.html}
                        disabled={false}
                        onChange={changeInput}
                        tagName='article'
                    />
                    <button onClick={addCategory} className="buttonAddCategory">Ajouter</button>
                </div>
            : 
                <div className="contentAddCategoryActive">
                    <div className="contentSetTimeout">
                        {setTimeout(() => {setSend(false); setAdding(false)}, 1500)}
                    </div>
                    <p className="textCategory">Catégorie ajoutée !</p>
                </div>}
        </div>
    )
}

export default AddCategory