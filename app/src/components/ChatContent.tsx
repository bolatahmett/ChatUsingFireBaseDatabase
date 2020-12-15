import React, { useEffect } from 'react'
import { showTimeOfMessage } from '../helper/helper';

export default function ChatContent(props: any) {

    const getMessageContent = () => {
        return props.messageItems.map((item: any) => {
            if (item.from) {
                var imgurl = item.sex === "woman" ? "../images/woman.png" : "../images/man.png";
                return <div className="d-flex">
                    <div className="alert message-other" role="alert"
                        onClick={() => showTimeOfMessage('`+ snapshot.key + `')}>
                        <img style={{ height: "16px" }} src={imgurl}></img>
                        <b style={{ color: item.color }} > {item.from + ":"} </b> {item.message}
                        <div id="timeOfMessage` + snapshot.key + `" style={{ display: "none" }}> {item.timeOfMessage}</div>
                    </div>
                </div>;
            } else {
                return <div className="d-flex justify-content-end">
                    <div className="alert message-me"
                        role="alert"
                        onClick={() => showTimeOfMessage(item.key)} >{item.message}
                        <div id={"timeOfMessage" + item.key} style={{ display: "none" }} >
                            {item.timeOfMessage}
                        </div>
                    </div>
                </div>;
            }
        });

    }

    return (
        <div className="card-body msg_card_body">
            <div id="mesajAlani" className="col-md-24">
                {getMessageContent()}
            </div>
        </div>
    )
}
