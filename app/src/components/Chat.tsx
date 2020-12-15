import React, { useEffect, useState } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { database } from './firebase';

export default function Chat(props: any) {

    return (
        <div id="chatEkrani" className="row" style={{ height: "100%", display: "none" }} >
            <div className="col-9 chat" style={{ height: "100%", paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="card" style={{ height: "100%" }}>
                    <ChatHeader></ChatHeader>
                    <ChatContent userName={props.userName}></ChatContent>
                    <ChatFooter></ChatFooter>
                </div>
            </div>
            <Users></Users>
        </div>
    )
}
