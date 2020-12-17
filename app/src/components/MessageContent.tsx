import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux';
import { showTimeOfMessage } from '../helper/helper';

const reducer = (currentState: any, action: any) => {
    if (action.type === "add") {
        return [...currentState, action.payload];
    }
}

function MessageContent(props: any) {
    const [messageItems, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        props.chatMessages && handleAddMessage(props.chatMessages)
    }, [props.chatMessages]);

    const handleAddMessage = (message: any) => {
        dispatch({
            type: "add",
            payload: message
        });
    }

    return (<>
        {messageItems.map((item: any) => {
            if (item.to === props.chatKey || (item.from === props.chatKey && item.to === props.userName)) {
                if (item.from !== props.userName) {
                    var imgurl = item.sex === "woman" ? "../images/woman.png" : "../images/man.png";
                    return <div className="d-flex">
                        <div className="alert message-other" role="alert" onClick={() => showTimeOfMessage(item.key)} >
                            <img style={{ height: "16px" }} src={imgurl}></img>
                            <b style={{ color: item.color }} > {item.from + ":"} </b> {item.message}
                            <div id="timeOfMessage` + snapshot.key + `" style={{ display: "none" }}> {item.timeOfMessage}</div>
                        </div>
                    </div>;
                } else {
                    return <div className="d-flex justify-content-end">
                        <div className="alert message-me" role="alert" onClick={() => showTimeOfMessage(item.key)} >{item.message}
                            <div id={"timeOfMessage" + item.key} style={{ display: "none" }} >
                                {item.timeOfMessage}
                            </div>
                        </div>
                    </div>;
                }
            }

        })}
    </>)
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    const userName = state.user;
    const chatMessages = state.chatMessages;
    return { startedChatUser, userName, chatMessages };
};

export default connect(mapStateToProps, null)(MessageContent);