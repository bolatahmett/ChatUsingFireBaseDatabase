import React, { useState } from 'react';
import './index.css';
import UserLogin from './components/UserLogin';
import Chat from './components/chat';
import { connect } from 'react-redux';
import UserContext from './components/UserContext';
import ErrorBoundary from './components/ErrorBoundary';
import VideoPlayer from './components/player';
import { Input, Modal } from 'antd';

interface AppProps {
    firebase: any;
    database: any;
    user: UserModel;
}


function App(props: AppProps) {
    const [visiblePalyer, setVisiblePlayer] = useState(false);
    const [shareInfo, setShareInfo] = useState(undefined);

    const sharePlayer = (shareInfo: ShareModel) => {

        setVisiblePlayer(true);
        shareInfo && setShareInfo(shareInfo);

    }

    const handleCancel = () => {
        setVisiblePlayer(false);
    }

    return (
        <>
            <ErrorBoundary
                // @ts-ignore
                fallbackRender={({ error, resetErrorBoundary, componentStack }) => (
                    <div>
                        <h1>An error occurred: {error.message}</h1>
                        <button onClick={resetErrorBoundary}>Try again</button>
                    </div>
                )}
            >
                <UserLogin></UserLogin>
                {props.user &&
                    <UserContext.Provider value={{ user: props.user, sharePlayer: sharePlayer }}>
                        <VideoPlayer shareInfo={shareInfo} visible={visiblePalyer} handleCancel={handleCancel} ></VideoPlayer>
                        <Chat />
                    </UserContext.Provider>
                }
            </ErrorBoundary>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, null)(App);