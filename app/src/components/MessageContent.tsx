import React, { useContext, useEffect, useReducer, useState } from 'react'
import { connect } from 'react-redux';
import { showTimeOfMessage } from '../helper/helper';
import UserContext from './UserContext';

interface MessageContentProps {
    blockedUsers?: UserModel[];
    chatMessages: ChatMessageModel[];
    chatKey: string;
}

function MessageContent(props: MessageContentProps) {
    const [messageItems, setMessageItems] = useState([])
    const context = useContext(UserContext);

    useEffect(() => {
        props.chatMessages && setMessageItems(props.chatMessages);
    }, [props.chatMessages]);

    useEffect(() => {

    }, [props.blockedUsers]);

    useEffect(() => {
        $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
    });


    const canMessageShow = (item: ChatMessageModel, isBlockedUser: boolean) => {
        return ((
            item.to === props.chatKey && props.chatKey === "Genel")
            || (item.from === props.chatKey && item.to === context.user.userName)
            || (item.to === props.chatKey && item.from === context.user.userName)) && !isBlockedUser;
    }

    const getMessageContentForFromMe = (uniqueKey: string, item: ChatMessageModel) => {
        return (
            <div id={item.key} className="d-flex justify-content-end">
                <div className="message-me" role="alert" onClick={() => showTimeOfMessage(uniqueKey)}>{item.message}
                    <div id={"timeOfMessage" + uniqueKey} style={{ display: "none" }}>
                        {item.timeOfMessage}
                    </div>
                </div>
            </div>
        );
    }

    const getMessageContentForFromOther = (uniqueKey: string, imgurl: string, item: ChatMessageModel) => {
        return (
            <div id={item.key} className="d-flex">
                <div className="message-other" role="alert" onClick={() => showTimeOfMessage(uniqueKey)}>
                    <img style={{ height: "16px" }} src={imgurl}></img>
                    <b style={{ color: item.color }}> {item.from + ":"} </b> {item.message}
                    <div id={"timeOfMessage" + uniqueKey} style={{ display: "none" }}>
                        {item.timeOfMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {
                messageItems.map((item: ChatMessageModel, index: number) => {
                    const uniqueKey = `${item.key}${index}`;
                    const isBlockedUser = props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === item.from);

                    if (canMessageShow(item, isBlockedUser)) {
                        if (item.from !== context.user.userName) {
                            var imgurl = item.gender === GenderOption.Woman ? "../images/woman.png" : "../images/man.png";
                            return getMessageContentForFromOther(uniqueKey, imgurl, item);
                        } else {
                            return getMessageContentForFromMe(uniqueKey, item);
                        }
                    }
                })
            }
        </>
    )
}

const mapStateToProps = (state: any) => {
    const chatMessages = state.chatMessages;
    const blockedUsers = state.blockedUsers;
    return { chatMessages, blockedUsers };
};

export default connect(mapStateToProps, null)(MessageContent);