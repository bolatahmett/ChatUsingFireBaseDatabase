import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { setOnline } from '../helper/helper';
import UserContext from './UserContext';


// Things to do before unloading/closing the tab
const doSomethingBeforeUnload = (userName: string) => {
    setOnline(userName, 0);
}

// Setup the `beforeunload` event listener
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

        <div id="chatEkrani" className="row" style={{ height: "100%", display: "none" }} >
            <div className="col-9 chat" style={{ height: "100%", paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="card" style={{ height: "100%" }}>
                    <ChatHeader></ChatHeader>
                    <ChatContent></ChatContent>
                    <ChatFooter></ChatFooter>
                </div>
            </div>
            <Users></Users>
        </div>
    )
}
