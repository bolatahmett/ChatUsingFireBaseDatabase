import React, { useEffect, useState } from 'react'
import { showTimeOfMessage } from '../helper/helper';
import { database } from './firebase';

export default function ChatContent(props: any) {
    const [messageItems, setMessageItems] = useState([]);

    useEffect(() => {
        chatYukle(props.userName);
    }, []);

    const chatYukle = (userName: any) => {

        database.ref("chats").on('child_added', (snapshot: any) => {
            var data = snapshot.val();
            if (data.from == userName) {
                const addedMessage = {
                    key: snapshot.key,
                    message: data.message,
                    timeOfMessage: data.timeOfMessage
                };

                setMessageItems(prevMessages => ([...prevMessages, addedMessage]));

            } else {
                var ref = database.ref("users/" + data.from);
                ref.once("value")
                    .then((snapshot: any) => {
                        if (snapshot.exists()) {
                            const addedMessage = {
                                key: snapshot.key,
                                from: data.from,
                                message: data.message,
                                timeOfMessage: data.timeOfMessage,
                                color: data.color,
                                sex: data.sex
                            };
                            setMessageItems(prevMessages => ([...prevMessages, addedMessage]));
                        }
                    });
            }

            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
        });
    }

    const getMessageContent = () => {
        return messageItems.map((item: any) => {
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