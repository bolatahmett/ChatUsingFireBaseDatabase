import React, { useContext, useEffect, useReducer, useState } from 'react'
import { connect } from 'react-redux';
import { showTimeOfMessage } from '../helper/helper';
import UserContext from './UserContext';

interface MessageContentProps {
    blockedUsers?: UserModel[];
    chatMessages: {};
    chatKey: string;
}

const reducer = (currentState: any, action: any) => {
    if (action.type === "add") {
        return [...currentState, action.payload];
    }
}

function MessageContent(props: MessageContentProps) {
    const [messageItems, dispatch] = useReducer(reducer, []);
    const context = useContext(UserContext);

    useEffect(() => {
        props.chatMessages && handleAddMessage(props.chatMessages)
    }, [props.chatMessages]);

    useEffect(() => {

    }, [props.blockedUsers]);

    useEffect(() => {
        $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
    });

    const handleAddMessage = (message: any) => {
        dispatch({
            type: "add",
            payload: message
        });
    }

    return (
        <>
            {
                messageItems.map((item: any) => {
                    const isBlockedUser = props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === item.from);
                    if (((
                        item.to === props.chatKey && props.chatKey === "Genel")
                        || (item.from === props.chatKey && item.to === context.user.userName)
                        || (item.to === props.chatKey && item.from === context.user.userName)) && !isBlockedUser) {
                        if (item.from !== context.user.userName) {
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
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    const chatMessages = state.chatMessages;
    const blockedUsers = state.blockedUsers;
    return { startedChatUser, chatMessages, blockedUsers };
};

export default connect(mapStateToProps, null)(MessageContent);