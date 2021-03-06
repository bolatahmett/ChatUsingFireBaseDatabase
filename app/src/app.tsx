import React, { useState } from 'react';
import '../src/index.css';
import UserLogin from '../src/components/UserLogin';
import Chat from '../src/components/Chat';
import { connect } from 'react-redux';
import UserContext from '../src/components/UserContext';
import ErrorBoundary from '../src/components/ErrorBoundary';
import VideoPlayer from '../src/components/player';
import { Button, notification } from 'antd';
import {
    CheckCircleFilled, CloseCircleFilled
} from '@ant-design/icons';

interface AppProps {
    firebase: any;
    database: any;
    user: UserModel;
}

function App(props: AppProps) {
    const [visiblePalyer, setVisiblePlayer] = useState(false);
    const [shareInfo, setShareInfo] = useState(undefined);

    const sharePlayer = (shareInfo: ShareModel) => {
        if (shareInfo.key === undefined) {
            setVisiblePlayer(true);

        } else {
            if (shareInfo.to === props.user.userName) {
                const contentDetail = <>
                    <Button type="primary" shape="round" onClick={() => {
                        notification.close("share");
                        setShareInfo(shareInfo);
                        setVisiblePlayer(true);
                    }} ><CheckCircleFilled />Kabul Et</Button>

                    <Button type="primary" shape="round" onClick={() => { notification.close("share"); }}>
                        <CloseCircleFilled /> Reddet</Button>
                </>;

                notification.open({
                    key: "share",
                    message: <><h5>{`${shareInfo.from} sizinle paylaşım yapmak istiyor.`}</h5></>,
                    description: contentDetail,
                    placement: "topRight",
                });
            }
        }
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