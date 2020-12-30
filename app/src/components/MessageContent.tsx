import React, { useContext, useEffect, useReducer, useState } from 'react'
import { connect } from 'react-redux';
import UserContext from './UserContext';
import useSound from 'use-sound';
// @ts-ignore
import * as alarm from "../sounds/rising-pops.mp3";
// @ts-ignore
import * as guitar from "../sounds/guitar-loop.mp3";
import { List, Comment, Button, Row, Col } from 'antd';
import { CaretRightOutlined, PauseCircleFilled } from '@ant-design/icons';

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
    const [play] = useSound(alarm.default);
    const [playGuitar, { stop, isPlaying }] = useSound(guitar.default);
    let prevItem: ChatMessageModel = undefined;

    useEffect(() => {
        if (props.chatMessages && props.chatMessages.length > 0) {
            props.chatMessages && setMessageItems(props.chatMessages);
            const lastMessage = props.chatMessages[props.chatMessages.length - 1];
            if (lastMessage.from !== context.user.userName && props.notification.some((item: string) => { return item === lastMessage.from })) {
                play();
            }
        }

    }, [props.chatMessages]);

    useEffect(() => {

    }, [props.blockedUsers]);

    useEffect(() => {
        const elemCard = $("#" + props.chatKey.trim() + "CardBody");
        elemCard && elemCard.scrollTop(elemCard[0].scrollHeight - elemCard[0].clientHeight);
    });

    const removeMessage = (key: string) => {
        console.log("yapım asamasında");
    }

    const canMessageShow = (item: ChatMessageModel, isBlockedUser: boolean) => {
        return ((
            item.to === props.chatKey && props.chatKey === "Genel")
            || (item.from === props.chatKey && item.to === context.user.userName)
            || (item.to === props.chatKey && item.from === context.user.userName)) && !isBlockedUser;
    }

    const getComemntContent = (item: ChatMessageModel) => {

        let result = <></>;

        if (canMessageShow(item, props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === item.from))) {

            if (prevItem && prevItem.from == item.from && prevItem.to && item.to) {
                result = <li style={{ marginLeft: "45px" }}> <Comment content={item.message} /> </li>;

            } else {

                result = <li>
                    <Comment
                        // actions={[
                        //     <span onClick={() => removeMessage(item.key)} key="comment-list-reply-to-0">Sil</span>
                        // ]}
                        author={item.from}
                        avatar={item.gender === GenderOption.Woman ? "../images/woman.png" : "../images/man.png"}
                        content={item.message}
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
                    <div id={`${props.chatKey.trim()}CardBody`} className="card-body msg_card_body" style={{ height: "100%" }}>
                        <div className="col-md-24" style={{ height: "100%" }}>
                            {
                                <List
                                    className="comment-list"
                                    header={
                                        <>
                                            {
                                                !isPlaying
                                                    ? <Button onClick={() => playGuitar()}><CaretRightOutlined />Oynat</Button>
                                                    : <Button onClick={() => stop()}><PauseCircleFilled />Durdur</Button>
                                            }
                                        </>
                                    }
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