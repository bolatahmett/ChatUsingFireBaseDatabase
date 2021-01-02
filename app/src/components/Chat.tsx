import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { setOnline } from '../helper/helper';
import UserContext from './UserContext';
import { Col, Row } from 'antd';
import { sharingListener } from '../listener/listener';
import { connect } from 'react-redux';


const doSomethingBeforeUnload = (userName: string) => {
    setOnline(userName, 0);
}

const setupBeforeUnloadListener = (userName: string) => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return doSomethingBeforeUnload(userName);
    });
    window.addEventListener("onunload ", (ev) => {
        ev.preventDefault();
        return doSomethingBeforeUnload(userName);
    });
};

function Chat(props: any) {

    const context = useContext(UserContext);
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    useEffect(() => {
        setupBeforeUnloadListener(context.user.userName);
    });

    useEffect(() => {
        sharingListener(context.user.userName, context.sharePlayer);
    }, []);

    useEffect(() => {
        setMenuCollapsed(getActiveChatUser() === 'Genel');
    }, [props.startedChatUser]);

    const getActiveChatUser = () => {
        const toUser = props.startedChatUser.find((item: ChatUserModel) => { if (item.isActive) return item; });
        return toUser && toUser.key;
    }

    return (
        <>
            <Row style={{ height: "50px" }}>
                <Col span={24} className="card" >
                    <ChatHeader></ChatHeader>
                </Col>
            </Row>

            <Row id="chatEkrani" justify="center" style={{ height: "calc(100% - 130px)", display: "none" }}>
                <Col xs={menuCollapsed ? 18 : 24} sm={menuCollapsed ? 18 : 24} md={menuCollapsed ? 21 : 24} lg={menuCollapsed ? 21 : 24} xl={menuCollapsed ? 21 : 24} className="chat" style={{ height: "100%" }}>
                    <div className="card" style={{ height: "100%" }}>
                        <ChatContent></ChatContent>
                    </div>
                </Col>
                {menuCollapsed && <Users></Users>}
            </Row>
            <ChatFooter></ChatFooter>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    return { startedChatUser };
};

export default connect(mapStateToProps, null)(Chat);

