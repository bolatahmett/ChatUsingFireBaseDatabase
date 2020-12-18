import React from 'react'
import { connect } from 'react-redux';
import { getUserInfoFromStorage, formatTime } from '../helper/helper'
import { database } from './firebase';

function ChatFooter(props: any) {

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

    const mesajGonder = () => {
        var mesaj = $("#mesaj").val();
        var userInfo = getUserInfoFromStorage();

        if (userInfo.userName != "" && mesaj != "") {
            var formattedTime = formatTime(new Date());
            var messageKey = database.ref("chats/").push().key;
            database.ref("chats/" + messageKey).set({
                message: mesaj,
                from: userInfo.userName,
                timeOfMessage: formattedTime,
                color: userInfo.color,
                sex: userInfo.sex,
                to: props.startedChatUser
            });

            $("#mesaj").val('');

        } else {
            alert("Lütfen boş alan bırakmayınız!");
        }
        return false;
    }

    return (
        <div className="card-footer" id="card-footer">
            <div className="input-group">
                <div className="input-group-append">
                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                </div>
                <textarea id="mesaj" name="mesaj" className="form-control type_msg"
                    placeholder="Mesajınızı yazın..." onKeyPress={onKeyPressMessage}></textarea>
                <div className="input-group-append">
                    <span className="input-group-text send_btn" onClick={mesajGonder}>Gönder</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    return { startedChatUser };
};

export default connect(mapStateToProps, null)(ChatFooter);