import React from 'react'
import { showTimeOfMessage } from '../helper/helper'

export default function MessageFromMe(props: any) {
    return (
        <div className="d-flex justify-content-end">
            <div className="alert message-me" role="alert" onClick={() => showTimeOfMessage(props.key)} >
                {props.message} <div id="timeOfMessage` + snapshot.key + `" style={{ display: "none" }}> {props.timeOfMessage}</div></div>
        </div>
    )
}
