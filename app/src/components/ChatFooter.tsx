import { Button, Col, Input, Row } from 'antd';
import React from 'react'
import { useContext } from 'react';
import { connect } from 'react-redux';
import { formatTime } from '../helper/helper'
import { database } from './firebase';
import UserContext from './UserContext';

interface ChatFooterProps {
    startedChatUser: ChatUserModel[];
}


function ChatFooter(props: ChatFooterProps) {

    const context = useContext(UserContext)

    const onKeyPressMessage = () => {
        var event = window.event;
        // @ts-ignore
        var key = event.keyCode;
        if (key === 13) {
            event!.preventDefault();
            mesajGonder();
            return false;
        } else {
            return true;
        }
    }

    const getActiveChatUser = () => {
        const toUser = props.startedChatUser.find((item: ChatUserModel) => { if (item.isActive) return item; });
        return toUser.key;
    }

    const mesajGonder = () => {
        var mesaj = $("#mesaj").val();

        if (context.user.userName != "" && mesaj != "") {
            var formattedTime = formatTime(new Date());
            var messageKey = database.ref("chats/").push().key;
            database.ref("chats/" + messageKey).set({
                message: mesaj,
                from: context.user.userName,
                timeOfMessage: formattedTime,
                color: context.user.color,
                gender: context.user.gender,
                to: getActiveChatUser()
            });

            $("#mesaj").val('');
            $("#mesaj").trigger("focus");

        } else {
            alert("Lütfen boş alan bırakmayınız!");
        }
        return false;
    }

    return (
        <>
            <Row justify="space-around" align="middle" style={{ height: "50px" }}>
                <Col span={24}>
                    <div className="card-footer" id="card-footer">
                        <div className="input-group">
                            <Input id={"mesaj"} onKeyPress={onKeyPressMessage}
                                placeholder="Mesajınızı yazın..."
                                style={{ fontSize: "small", borderRadius: "20px" }}
                                suffix={
                                    <Button className="input-group-text send_btn" onClick={mesajGonder}>Gönder</Button>
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    return { startedChatUser };
};

export default connect(mapStateToProps, null)(ChatFooter);