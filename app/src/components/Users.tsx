import React from 'react'
import { addBlockedIp, showUserOptions } from '../helper/helper';

export default function Users(props: any) {

    const getMessageItems = (contacts: any) => contacts.map((contactItem: any) => {
        return <li className="active">
            <div className="user_info" onClick={() => showUserOptions(contactItem.kulid)}>
                <p className="fas fa-user" style={{ marginTop: "revert", marginBottom: "revert", color: contactItem.color }} >  {contactItem.username} </p>
            </div>
            <div id={"options" + contactItem.kulid + ""} style={{ display: "none", cursor: "pointer" }} >
                <ul>
                    <li onClick={() => addBlockedIp(contactItem.ip, contactItem.username)}><i className="fas fa-ban"></i> Engelle</li>
                </ul>
            </div>
        </li >
    });

    return (

        <div className="col-3 chat" style={{ height: "100%", paddingRight: "0px", paddingLeft: "0px" }}>
            <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "100%" }}>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control search" placeholder="Search" name=""></input>
                </div>
                <div style={{ height: "100%" }}>
                    <ul id="contacts" className="contacts">
                        {getMessageItems(props.contacts)}
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}
