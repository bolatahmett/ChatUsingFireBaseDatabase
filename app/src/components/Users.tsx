import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { showUserOptions } from '../helper/helper';
import { database } from './firebase';
import { addChat, addBlockedUser, removeBlockedUser } from '../redux/actions/action';

function Users(props: any) {

    const [contactItems, setContactItem] = useState([]);

    useEffect(() => {
        userLoad();
    }, []);

    const userLoad = () => {
        database.ref("users").on('value', (snapshot: any) => {
            let changedContextItems: UserModel[] = [];
            snapshot.forEach((childSnapshot: any) => {
                const data = childSnapshot.val();
                data.online === 1 && changedContextItems.push({
                    key: data.key,
                    userName: data.userName,
                    password: "",
                    ip: data.ip,
                    sex: data.sex,
                    color: data.color
                } as UserModel);

            });
            setContactItem(changedContextItems);
        });
    }

    const startChat = (userName: string) => {
        props.addChat(userName);
    }

    const getContactItems = () => contactItems.map((contactItem: UserModel) => {
        return <li className="active" key={contactItem.key}>
            <div className="user_info" onClick={() => showUserOptions(contactItem.key, contactItem.userName, props.user.userName)}>
                <p className="fas fa-user" style={{ marginTop: "revert", marginBottom: "revert", color: contactItem.color }} >  {contactItem.userName} </p>
            </div>
            <div id={"options" + contactItem.key + ""} style={{ display: "none", cursor: "pointer" }} >
                <ul style={{ listStyleType: "none" }}>
                    {
                        props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === contactItem.userName)
                            ? <li onClick={() => { props.removeBlockedUser(contactItem); }}><i className="fas fa-user"></i> İzin Ver</li>
                            : <li onClick={() => { props.addBlockedUser(contactItem); }}><i className="fas fa-user-slash"></i> Engelle</li>
                    }
                    <li onClick={() => startChat(contactItem.userName)}><i className="fas fa-comment"></i> Mesaj Gönder</li>
                </ul>
            </div>
        </li >;
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
                        {getContactItems()}
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    const blockedUsers = state.blockedUsers;
    return { user, blockedUsers };
};

export default connect(mapStateToProps, {
    addChat,
    addBlockedUser,
    removeBlockedUser
})(Users);
