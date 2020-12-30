import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';
import 'antd/dist/antd.css';
import 'ant-design-draggable-modal/dist/index.css';
import { Button, Input } from 'antd';
import { database } from './firebase';
import UserContext from './UserContext';
import { connect } from 'react-redux';

// @ts-ignore
const ReactPlayerDefault = ReactPlayer.default;

interface VideoPlayerProps {
    visible: boolean;
    handleCancel: any;
    startedChatUser: ChatUserModel[];
    shareInfo: ShareModel;
}

function VideoPlayer(props: VideoPlayerProps) {

    const [visible, setVisible] = useState(true);
    const [shareUrl, setShareUrl] = useState("");

    const context = useContext(UserContext);

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    useEffect(() => {

        if (props.shareInfo && props.shareInfo.to === context.user.userName) {
            setShareUrl(props.shareInfo.url);
        }

    }, [props.shareInfo]);

    const getActiveChatUser = () => {
        const toUser = props.startedChatUser.find((item: ChatUserModel) => { if (item.isActive) return item; });
        return toUser && toUser.key;
    }

    const handleOk = () => {
        var messageKey = database.ref("share/").push().key;
        database.ref("share/" + messageKey).set({
            url: shareUrl,
            from: context.user.userName,
            to: getActiveChatUser()
        });
    };

    const handleCancel = () => {
        setVisible(false);
        props.handleCancel();
    };

    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShareUrl(event.target.value);
    }

    return (
        <DraggableModalProvider>
            <DraggableModal
                visible={visible}
                initialHeight={350}
                initialWidth={350}
                onCancel={handleCancel}
                footer={
                    <>
                        <Button shape="round" onClick={handleOk}>Paylaş</Button>
                    </>
                }
            >
                <Input placeholder={"Url"} value={shareUrl} onChange={handleChangeUrl}></Input>
                <ReactPlayerDefault
                    url={shareUrl}
                    width='100%'
                    height='100%'
                />
            </DraggableModal>
        </DraggableModalProvider>
    )
}


const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    return { startedChatUser };
};

export default connect(mapStateToProps, null)(VideoPlayer);