import React, { useContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { addChat, removeChat, activateChat } from '../redux/actions/action';
import { addChatMessages } from '../redux/actions/action';
import { chatMessagesListener } from '../listener/listener';
import { Tabs } from 'antd';
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
    }, [props.startedChatUser]);

    const addChatFromReceivedMessage = (messageContent: ChatMessageModel) => {
        if (messageContent && messageContent.from !== context.user.userName && messageContent.to === context.user.userName) {
            const checkIfExist = tabChatContent.find((item) => {
                if (item.key === messageContent.from) {
                    return item;
                }
            });

            if (!checkIfExist) {
                const chatUserModel: ChatUserModel = {
                    key: messageContent.from,
                    isActive: false,
                    isMessageReceived: true
                } as ChatUserModel;
                props.addChat(chatUserModel);
            }

        }
    }

    const alertUserForReceivedMessage = (messageContent: ChatMessageModel) => {
        if (messageContent.to === context.user.userName && messageContent.from !== getActiveKey()) {
            const alertTabChatContent = tabChatContent.slice();
            alertTabChatContent.forEach((item: ChatUserModel) => {
                if (item.key === messageContent.from)
                    item.isMessageReceived = true;
            });
            setTabChatContent(alertTabChatContent);
        }
    }

    const changeTab = (activeKey: string) => {
        const chatUserModel: ChatUserModel = {
            key: activeKey,
            isActive: true,
            isMessageReceived: false
        } as ChatUserModel;
        props.activateChat(chatUserModel);
    };

    const onEdit = (targetKey: string, action: any) => {
        eval(action)(targetKey);
    };

    // const remove = (targetKey: string) => {
    //     const chatUserModel: ChatUserModel = {
    //         key: targetKey,
    //         isActive: false,
    //         isMessageReceived: false
    //     } as ChatUserModel;
    //     props.removeChat(chatUserModel);
    // };

    const getActiveKey = () => {
        const activeItem: ChatUserModel = tabChatContent.find((item: ChatUserModel) => {
            if (item.isActive) {
                return item;
            }
        });

        return activeItem && activeItem.key;
    }

    return (
        <>
            <Tabs activeKey={getActiveKey()}
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
                                tab={<TabNotification tabTitle={item.key} hasNewMessage={item.isMessageReceived} userName={item.key} />}>
                                <>
                                    <MessageContent chatKey={item.key} chatUser={item.key}></MessageContent>
                                </>
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