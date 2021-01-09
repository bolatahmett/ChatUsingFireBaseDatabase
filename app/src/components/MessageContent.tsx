import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import UserContext from './UserContext';
import { List, Comment, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
// @ts-ignore
import * as alarm from "../sounds/rising-pops.mp3";
import AudioPlayer from './audio-player';
import { Howl } from 'howler';
// @ts-ignore
const ReactPlayerDefault = ReactPlayer.default;


interface MessageContentProps {
    blockedUsers?: UserModel[];
    chatMessages: ChatMessageModel[];
    chatKey: string;
    chatUser: string;
    notification: string[];
}

function MessageContent(props: MessageContentProps) {
    const [messageItems, setMessageItems] = useState([])
    const context = useContext(UserContext);
    const sound = new Howl({
        src: [alarm.default]
    });

    let prevItem: ChatMessageModel = undefined;

    useEffect(() => {
        if (props.chatMessages && props.chatMessages.length > 0) {
            props.chatMessages && setMessageItems(props.chatMessages);
            const lastMessage = props.chatMessages[props.chatMessages.length - 1];
            if (lastMessage.from !== context.user.userName && props.notification.some((item: string) => { return item === lastMessage.from })) {
                sound.play();
            }
        }

    }, [props.chatMessages]);

    useEffect(() => {

    }, [props.blockedUsers]);

    useEffect(() => {
        const elemCard = $("#" + props.chatKey.trim() + "CardBody");
        elemCard && elemCard.scrollTop(elemCard[0].scrollHeight - elemCard[0].clientHeight);
    });


    const canMessageShow = (item: ChatMessageModel, isBlockedUser: boolean) => {
        return ((
            item.to === props.chatKey && props.chatKey === "Genel")
            || (item.from === props.chatKey && item.to === context.user.userName)
            || (item.to === props.chatKey && item.from === context.user.userName)) && !isBlockedUser;
    }

    const getUrlFromMessage = (message: string) => {

        const arrayMessage = message.split(' ');
        const url = arrayMessage.find((item: string) => {
            if (item.startsWith('http'))
                return item;
        });
        return url;
    }

    const getMessageContent = (message: string) => {
        const shareUrl = getUrlFromMessage(message);

        if (shareUrl) {

            return <>
                <div className='player-wrapper'>
                    <ReactPlayerDefault
                        className='react-player'
                        url={shareUrl}
                        width='100%'
                        height='100%'
                    />
                </div>
                <p>{message}</p>
            </>;
        } else {
            return message;
        }
    }

    const getComemntContent = (item: ChatMessageModel) => {
        let result = <></>;

        if (canMessageShow(item, props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === item.from))) {


            if (prevItem && prevItem.from == item.from && prevItem.to && item.to) {
                result = <li style={{ marginLeft: "45px" }}>
                    <Comment content={getMessageContent(item.message)} />
                </li>;

            } else {

                result = <li>
                    <Comment
                        author={item.from}
                        avatar={item.gender === GenderOption.Woman ? "../images/woman.png" : "../images/man.png"}
                        content={getMessageContent(item.message)}
                        datetime={item.timeOfMessage} />
                </li>
            }
        }
        prevItem = item;

        return result;
    }

    return (
        <>
            <Row style={{ height: "100%" }}>
                <Col span={24} style={{ height: "100%" }}>

                    <div className="message-container">
                        <div className="box"> <AudioPlayer></AudioPlayer></div>

                        <div id={`${props.chatKey.trim()}CardBody`} className=" box box-2 card-body msg_card_body">
                            <div className="col-md-24" style={{ height: "100%" }}>
                                {
                                    <List
                                        className="comment-list"
                                        itemLayout="horizontal"
                                        dataSource={messageItems}
                                        size={"small"}
                                        renderItem={(item: ChatMessageModel) => (
                                            <>
                                                {
                                                    getComemntContent(item)
                                                }
                                            </>

                                        )}
                                    />
                                }
                            </div>
                        </div>

                    </div>

                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const chatMessages = state.chatMessages;
    const blockedUsers = state.blockedUsers;
    const notification = state.notification;
    return { chatMessages, blockedUsers, notification };
};

export default connect(mapStateToProps, null)(MessageContent);