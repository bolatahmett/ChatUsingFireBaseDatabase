import React, { useContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { addChat, removeChat, activateChat } from '../redux/actions/action';
import { addChatMessages } from '../redux/actions/action';
import { chatMessagesListener } from '../listener/listener';
import { Col, Row, Tabs } from 'antd';
import MessageContent from './MessageContent';
import TabNotification from './TabNotification';
import UserContext from './UserContext';

const { TabPane } = Tabs;

interface ChatContentProps {
    addChatMessages: any;
    chatMessages: ChatMessageModel[];
    addChat: any;
    startedChatUser: ChatUserModel[];
    activateChat: any;
    removeChat: any;
}

function ChatContent(props: ChatContentProps) {
    const context = useContext(UserContext);
    const [tabChatContent, setTabChatContent] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState("1");

    useEffect(() => {
        chatMessagesListener(context.user.userName, props.addChatMessages);
    }, []);

    useEffect(() => {
        if (props.chatMessages && props.chatMessages.length > 0) {
            const messageContent = props.chatMessages[props.chatMessages.length - 1];
            addChatFromReceivedMessage(messageContent);
            alertUserForReceivedMessage(messageContent);
        }
    }, [props.chatMessages]);

    useEffect(() => {
        setTabChatContent(props.startedChatUser);
        props.startedChatUser.length > 0 && setActiveTabKey(props.startedChatUser[props.startedChatUser.length - 1].key);
    }, [props.startedChatUser]);

    const addChatFromReceivedMessage = (messageContent: ChatMessageModel) => {
        if (messageContent && messageContent.from !== context.user.userName && messageContent.to === context.user.userName) {
            const checkIfExist = tabChatContent.find((item) => {
                if (item.key === messageContent.from) {
                    return item;
                }
            });

            !checkIfExist && props.addChat(messageContent.from);
        }
    }

    const alertUserForReceivedMessage = (messageContent: ChatMessageModel) => {
        if (messageContent.to === context.user.userName && messageContent.from !== activeTabKey) {
            tabChatContent.forEach((item: ChatUserModel) => {
                if (item.key === messageContent.from)
                    item.isMessageReceived = true;
            });
            setTabChatContent(tabChatContent);
        }
    }

    const changeTab = (activeKey: string) => {
        props.activateChat(activeKey);
        setActiveTabKey(activeKey);
        tabChatContent.forEach((item: ChatUserModel) => { if (item.key === activeKey) item.isMessageReceived = false; });
        setTabChatContent(tabChatContent);
    };

    const onEdit = (targetKey: string, action: any) => {
        eval(action)(targetKey);
    };

    const remove = (targetKey: string) => {
        props.removeChat(targetKey);
    };

    return (
        <>
            <Tabs activeKey={activeTabKey}
                type="editable-card"
                size={"small"}
                hideAdd
                onChange={changeTab}
                onEdit={onEdit}
                style={{ borderRadius: "20px 0px 0px 0px" }} >
                {
                    tabChatContent.length > 0 && tabChatContent.map((item: ChatUserModel) => {
                        return (
                            <TabPane key={item.key} closable={item.key !== "Genel"}
                                tab={<TabNotification tabTitle={item.key} hasNewMessage={item.isMessageReceived} />}>
                                <Row style={{ height: "100%" }}>
                                    <Col span={24} style={{ height: "100%" }}>
                                        <div className="card-body msg_card_body" style={{ height: "100%" }}>
                                            <div className="col-md-24" style={{ height: "100%" }}>
                                                <MessageContent chatKey={item.key}></MessageContent>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        )
                    })
                }
            </Tabs >
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    const chatMessages = state.chatMessages;
    return { startedChatUser, chatMessages };
};

export default connect(mapStateToProps, {
    activateChat,
    removeChat,
    addChat,
    addChatMessages
})(ChatContent);