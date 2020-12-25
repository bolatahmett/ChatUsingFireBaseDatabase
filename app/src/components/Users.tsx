import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { database } from './firebase';
import { addChat, removeChat, addBlockedUser, removeBlockedUser } from '../redux/actions/action';
import { Menu } from 'antd';
import { MessageOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function Users(props: any) {

    const [contactItems, setContactItem] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [openKeys, setOpenKeys] = React.useState([]);

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
                    gender: data.gender,
                    color: data.color
                } as UserModel);

            });
            setContactItem(changedContextItems);
        });
    }

    const startChat = (userName: string) => {
        props.addChat(userName);
    }

    const getContactItemsForMenu = () => contactItems.filter((item: UserModel) => {
        if (item.userName.includes(searchItem))
            return item;
    }).map((contactItem: UserModel) => {
        debugger;
        const contentContact = contactItem.userName === props.user.userName
            ? <Menu.Item key={contactItem.userName} style={{ color: contactItem.color }}>{contactItem.userName}</Menu.Item>
            : <SubMenu key={contactItem.userName} title={contactItem.userName} style={{ color: contactItem.color }}>
                <Menu.Item key={`sendMessage${contactItem.userName}`} icon={<MessageOutlined />} onClick={() => startChat(contactItem.userName)} >Mesaj Gönder</Menu.Item>
                {
                    props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === contactItem.userName)
                        ? <Menu.Item key={`blockUser${contactItem.userName}`} icon={<EyeOutlined />} onClick={() => { props.removeBlockedUser(contactItem); }} >İzin Ver</Menu.Item>
                        : <Menu.Item key={`blockUser${contactItem.userName}`} icon={<EyeInvisibleOutlined />} onClick={() => { props.addBlockedUser(contactItem); }} >Engelle</Menu.Item>
                }
            </SubMenu>;

        return contentContact;
    });

    const onOpenChange = (items: string[]) => {
        const latestOpenKey = items.find((key: string) => openKeys.indexOf(key) === -1);
        const checkedOpenKey = latestOpenKey ? [latestOpenKey] : [];
        setOpenKeys(checkedOpenKey);
    };

    const handleSearch = () => {
        const value = $("#searchUser").val() ? $("#searchUser").val().toString() : "";
        setSearchItem(value);
    }

    return (
        <>
            <div style={{
                height: "100%",
            }}>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control search" placeholder="Search" id="searchUser" onKeyDown={handleSearch}></input>
                </div>
                <Menu mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    inlineIndent={24}
                    className={"chat-menu"}
                >
                    {getContactItemsForMenu()}
                </Menu>
            </div>
            <div className="card-footer"></div>
        </>

    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    const blockedUsers = state.blockedUsers;
    return { user, blockedUsers };
};

export default connect(mapStateToProps, {
    addChat,
    removeChat,
    addBlockedUser,
    removeBlockedUser
})(Users);
