import React from 'react'
import {Link} from "react-router-dom"
import './LinkEditor.scss'

const LinkEditor = (props) => {

    return(
        <Link className="contentLinkEditor"
        to={{
            pathname: '/editeur',
            state: {
                modelId: props.modelId
            }}}>
            <Link className="linkEditor"
                to={{
                    pathname: '/editeur',
                    state: {
                        modelId: props.modelId
                    }}}>éditeur
                    <div className="contentShine">
                        <div className="shine"/>
                    </div>
            </Link>
        </Link>
    )
}

export default LinkEditor