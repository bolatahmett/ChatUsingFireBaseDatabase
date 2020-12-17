import React from 'react'
import { connect } from 'react-redux';
import { clearHistory, showMenu, showUserOptions } from '../helper/helper'

function ChatHeader(props: any) {
    return (
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
                <div className="user_info">
                    <span style={{ fontFamily: "cursive" }}>Chat {props.userName}</span>
                </div>
            </div>
            <span id="action_menu_btn"><i className="fas fa-ellipsis-v" onClick={showMenu}></i></span>
            <div id="action_menu" className="action_menu">
                <ul>
                    <li><i className="fas fa-user-circle"></i> Profil</li>
                    <li><i className="fas fa-users"></i> Arkadaş Ekle</li>
                    <li><i className="fas fa-plus"></i> Grup Ekle</li>
                    <li><i className="fas fa-ban"></i> Engelle</li>
                    <li onClick={clearHistory} > <i className="fas fa-trash"></i> Sohbeti Temizle</li>
                    <li onClick={() => showUserOptions("a", "", "")}><i className="fas fa-filter"></i> Tercihler</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const userName = state.user;
    return { userName };
};

export default connect(mapStateToProps, null)(ChatHeader);