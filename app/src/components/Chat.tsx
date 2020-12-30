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

export default function Chat() {

    const context = useContext(UserContext);

    useEffect(() => {
        setupBeforeUnloadListener(context.user.userName);
    });

    useEffect(() => {
        sharingListener(context.user.userName, context.sharePlayer);
    }, []);

    return (
        <>
            <Row style={{ height: "50px" }}>
                <Col span={24} className="card" >
                    <ChatHeader></ChatHeader>
                </Col>
            </Row>

            <Row id="chatEkrani" justify="center" style={{ height: "calc(100% - 130px)", display: "none" }}>
                <Col flex="auto" className="chat" style={{ height: "100%" }}>
                    <div className="card" style={{ height: "100%" }}>
                        <ChatContent></ChatContent>
                    </div>
                </Col>
                <Users></Users>
            </Row>
            <ChatFooter></ChatFooter>
        </>
    )
}
