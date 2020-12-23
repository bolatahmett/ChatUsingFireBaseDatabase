import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { setOnline } from '../helper/helper';
import UserContext from './UserContext';
import { Col, Row } from 'antd';


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

    return (
        <>
            <Row style={{ height: "50px" }}>
                <Col span={24} className="card" >
                    <ChatHeader></ChatHeader>
                </Col>
            </Row>

            <Row id="chatEkrani" justify="center" style={{ height: "calc(100% - 50px)", display: "none" }}>
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className="chat" style={{ height: "100%" }}>
                    <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "100%" }}>
                        <Users></Users>
                    </div>
                </Col>
                <Col xs={18} sm={18} md={21} lg={21} xl={21} className="chat" style={{ height: "100%" }}>
                    <div className="card" style={{ height: "100%" }}>
                        <ChatContent></ChatContent>
                        <ChatFooter></ChatFooter>
                    </div>
                </Col>
            </Row>
        </>
    )
}
