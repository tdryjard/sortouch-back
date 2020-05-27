import React from 'react'
import {Link} from "react-router-dom"
import './LinkChatBot.scss'

const LinkChatBot = (props) => {

    return(
        <Link className="contentLinkChatBot"
        to={{
            pathname: `/chatbot/w${props.userId*48/16+150}&${props.modelId*8/4+150}`,
            state: {
                modelId: props.modelId
            }}}>
            <Link className="linkEditor"
                to={{
                    pathname: `/chatbot/w${props.userId*48/16+150}&${props.modelId*8/4+150}`,
                    state: {
                        modelId: props.modelId
                    }}}>ChatBot
                    <div className="contentShine">
                        <div className="shine"/>
                    </div>
            </Link>
        </Link>
    )
}

export default LinkChatBot