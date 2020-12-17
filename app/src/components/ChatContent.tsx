import React, { useEffect, useReducer, useState } from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { addChat } from '../redux/actions/action';
import { addChatMessages } from '../redux/actions/action';
import { chatMessagesListener } from '../Listener/listener';
import ChatTabs from './ChatTabs';

function ChatContent(props: any) {

    const [tabChatContent, setTabChatContent] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState("1");

    useEffect(() => {
        chatMessagesListener(props.userName, props.addChatMessages);
    }, []);

    useEffect(() => {

        if (props.chatMessages && props.chatMessages.from !== props.userName) {
            const checkIfExist = tabChatContent.filter((item) => {
                if (item.key === props.chatMessages.from) {
                    return item;
                }
            });

            if (checkIfExist.length === 0) {
                props.addChat(props.chatMessages.from);
            }
        }

    }, [props.chatMessages]);

    useEffect(() => {
        const checkIfExist = tabChatContent.filter((item) => {
            if (item.key === props.startedChatUser) {
                return item;
            }
        });

        if (props.startedChatUser && checkIfExist.length === 0) {
            setTabChatContent(prevChat => ([...prevChat, { key: props.startedChatUser }]));
            setActiveTabKey(props.startedChatUser);
        }

    }, [props.startedChatUser]);


    const changeTab = (activeKey: any) => {
        props.addChat(activeKey);
        setActiveTabKey(activeKey);
    };

    return (
        <>
            <ChatTabs tabChatContent={tabChatContent} activeTabKey={activeTabKey} changeTab={changeTab}></ChatTabs>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    const userName = state.user;
    const chatMessages = state.chatMessages;
    return { startedChatUser, userName, chatMessages };
};

export default connect(mapStateToProps, {
    addChat,
    addChatMessages
})(ChatContent);