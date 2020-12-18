import React, { useContext, useEffect, useReducer, useState } from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { addChat } from '../redux/actions/action';
import { addChatMessages } from '../redux/actions/action';
import { chatMessagesListener } from '../Listener/listener';
import { Col, Row, Tabs } from 'antd';
import MessageContent from './MessageContent';
import TabNotification from './TabNotification';
import UserContext from './UserContext';

const { TabPane } = Tabs;

function ChatContent(props: any) {
    const context = useContext(UserContext);
    const [tabChatContent, setTabChatContent] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState("1");

    useEffect(() => {
        chatMessagesListener(context.userName, props.addChatMessages);
    }, []);

    useEffect(() => {

        if (props.chatMessages && props.chatMessages.from !== context.userName && props.chatMessages.to === context.userName) {
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
            <Tabs activeKey={activeTabKey} onChange={changeTab} type="line" size={"small"}>
                {
                    tabChatContent.length > 0 && tabChatContent.map((item: any) => {
                        debugger;
                        return <TabPane tab={<TabNotification tabTitle={item.key} hasNewMessage={false} />} key={item.key}>
                            <Row style={{ height: "100%" }}>
                                <Col span={24} style={{ height: "100%" }}>
                                    <div className="card-body msg_card_body" style={{ height: "100%" }}>
                                        <div id={item.key} className="col-md-24" style={{ height: "100%" }}>
                                            <MessageContent chatKey={item.key}></MessageContent>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
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
    addChat,
    addChatMessages
})(ChatContent);