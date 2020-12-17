import React from 'react';
import './index.css';
import UserLogin from './components/UserLogin';
import Chat from './components/chat';
import { connect } from 'react-redux';

interface AppProps {
    firebase: any;
    database: any;
    userName?: string;
}

function App(props: AppProps) {
    return (
        <>
            <div className="container-fluid" style={{ height: "100%" }}>
                <UserLogin></UserLogin>
                {props.userName && <Chat></Chat>}
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const userName = state.user;
    return { userName };
};

export default connect(mapStateToProps, null)(App);