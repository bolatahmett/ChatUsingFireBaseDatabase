import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addBlockedIp, showUserOptions } from '../helper/helper';
import { database } from './firebase';
import { addChat } from '../redux/actions/action';

function Users(props: any) {

    const [contactItems, setContactItem] = useState([]);

    useEffect(() => {
        userLoad();
    }, []);

    const userLoad = () => {
        database.ref("users").on('value', (snapshot: any) => {
            let changedContextItems: any = [];
            snapshot.forEach((childSnapshot: any) => {
                var data = childSnapshot.val();
                if (data.online === 1) {
                    changedContextItems.push(data);
                }
            });
            setContactItem(changedContextItems);
        });
    }

    const startChat = (userName: string) => {
        props.addChat(userName);
    }

    const getMessageItems = (contacts: any) => contacts.map((contactItem: any) => {
        return <li className="active">
            <div className="user_info" onClick={() => showUserOptions(contactItem.kulid, contactItem.username, props.user)}>
                <p className="fas fa-user" style={{ marginTop: "revert", marginBottom: "revert", color: contactItem.color }} >  {contactItem.username} </p>
            </div>
            <div id={"options" + contactItem.kulid + ""} style={{ display: "none", cursor: "pointer" }} >
                <ul style={{ listStyleType: "none" }}>
                    {/* <li onClick={() => addBlockedIp(contactItem.ip, contactItem.username)}><i className="fas fa-comment-slash"></i> Engelle</li> */}
                    <li onClick={() => startChat(contactItem.username)}><i className="fas fa-comment"></i> Mesaj Gönder</li>
                </ul>
            </div>
        </li>;
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
                        {getMessageItems(contactItems)}
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, {
    addChat
})(Users);
