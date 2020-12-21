import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { showUserOptions } from '../helper/helper';
import { database } from './firebase';
import { addChat, addBlockedUser, removeBlockedUser } from '../redux/actions/action';
import { Menu } from 'antd';
import { MessageOutlined, UserOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

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

    const getContactItemsForMenu = () => contactItems.map((contactItem: UserModel) => {

        const contentContact = contactItem.userName === props.user.userName
            ? <Menu.Item key={contactItem.key} icon={<UserOutlined />} style={{ color: contactItem.color }}>{contactItem.userName}</Menu.Item>
            : <SubMenu key={contactItem.key} icon={<UserOutlined />} title={contactItem.userName} style={{ color: contactItem.color }}>
                <Menu.Item key={`sendMessage${contactItem.key}`} icon={<MessageOutlined />} onClick={() => startChat(contactItem.userName)} >Mesaj Gönder</Menu.Item>
                {
                    props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === contactItem.userName)
                        ? <Menu.Item key={`blockUser${contactItem.key}`} icon={<EyeOutlined />} onClick={() => { props.removeBlockedUser(contactItem); }} >İzin Ver</Menu.Item>
                        : <Menu.Item key={`blockUser${contactItem.key}`} icon={<EyeInvisibleOutlined />} onClick={() => { props.addBlockedUser(contactItem); }} >Engelle</Menu.Item>
                }
            </SubMenu>;

        return contentContact;
    });


    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (

        <div className="col-3 chat" style={{ height: "100%", paddingRight: "0px", paddingLeft: "0px" }}>
            <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "100%" }}>
                <div style={{
                    height: "100%",
                    paddingTop: "54px",
                    paddingBottom: "45px"
                }}>
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control search" placeholder="Search" name=""></input>
                    </div>
                    {/* <ul id="contacts" className="contacts">
                        {getContactItems()}
                    </ul> */}
                    <Menu mode="inline"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        inlineIndent={5}
                        className={"chat-menu"}
                    >
                        {getContactItemsForMenu()}
                    </Menu>
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
