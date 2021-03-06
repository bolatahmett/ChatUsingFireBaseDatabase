import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { database } from './firebase';
import { addChat, removeChat, addBlockedUser, removeBlockedUser } from '../redux/actions/action';
import { Button, Col, Divider, Menu, notification, Row } from 'antd';
import {
    MessageOutlined, EyeInvisibleOutlined, EyeOutlined
} from '@ant-design/icons';
import { ArgsProps } from 'antd/lib/notification';


function Users(props: any) {

    const [contactItems, setContactItem] = useState([]);
    const [searchItem, setSearchItem] = useState("");


    useEffect(() => {
        userLoad();
    }, []);

    const userLoad = () => {
        database.ref("users").orderByChild("userName").on('value', (snapshot: any) => {
            let changedContextItems: UserModel[] = [];
            snapshot.forEach((childSnapshot: any) => {
                const data = childSnapshot.val() as UserModel;
                data.online === 1 && changedContextItems.push({
                    key: data.key,
                    userName: data.userName,
                    password: "",
                    ip: data.ip,
                    gender: data.gender,
                    color: data.color,
                    heigth: data.heigth,
                    weight: data.weight,
                    expectations: data.expectations,
                    fleshColored: data.fleshColored
                } as UserModel);

            });

            setContactItem(changedContextItems.sort((a, b) => (a.userName.toUpperCase() > b.userName.toUpperCase()) ? 1 : -1));
        });
    }

    const startChat = (userName: string) => {
        const chatUserModel: ChatUserModel = {
            key: userName,
            isActive: true,
            isMessageReceived: false
        } as ChatUserModel;
        props.addChat(chatUserModel);
    }

    const getUserInfo = (user: UserModel) => {
        const isBlockedUser = props.blockedUsers.some((blockedUser: UserModel) => blockedUser.userName === user.userName)
        return <>
            <div style={{ fontFamily: "cursive", fontSize: "x-small" }}>

                <Divider></Divider>
                <Row >
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <span>{`Cinsiyet`}</span>
                            </Col>
                            <Col span={12}>
                                <span>{`${user.gender}`}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>{`Boy:`}</span>
                            </Col>
                            <Col span={12}>
                                <span>{`${user.heigth}`}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>{`Kilo:`}</span>
                            </Col>
                            <Col>
                                <span>{`${user.weight}`}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>{`Ten:`}</span>
                            </Col>
                            <Col span={12}>
                                <span>{`${user.fleshColored}`}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>{`Beklentiler:`}</span>
                            </Col>
                            <Col span={12}>
                                <span>{`${user.expectations}`}</span>
                            </Col>
                        </Row>
                        <Divider></Divider>
                        {user.userName !== props.user.userName && <Row justify={"center"}>
                            <Col className="gutter-row" span={12}>
                                <Button size={"small"} onClick={() => {
                                    startChat(user.userName);
                                    notification.close(user.userName);
                                }}><MessageOutlined /><span style={{ fontFamily: "cursive", fontSize: "x-small" }}>Mesaj Gönder</span></Button>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                {isBlockedUser ? <Button size={"small"} onClick={() => {
                                    props.removeBlockedUser(user);
                                    notification.close(user.userName);
                                }}><EyeOutlined /> <span style={{ fontFamily: "cursive", fontSize: "x-small" }}> Izin ver</span> </Button>
                                    : <Button size={"small"} onClick={() => {
                                        props.addBlockedUser(user);
                                        notification.close(user.userName);
                                    }}><EyeInvisibleOutlined /><span style={{ fontFamily: "cursive", fontSize: "x-small" }}>Engelle</span></Button>}
                            </Col>
                        </Row>}
                    </Col>
                </Row>
            </div>
        </>
    }

    const handleOnTitleClick = (selectedItem: string) => {
        const contactItem: UserModel = contactItems.find((item: UserModel) => {
            if (item.userName === selectedItem) {
                return item;
            }
        });

        const contentDetail = getUserInfo(contactItem);
        var imgurl = contactItem.gender === GenderOption.Woman ? "../images/woman.png" : "../images/man.png";
        const args: ArgsProps = {
            key: contactItem.userName,
            message: <>
                <Row>
                    <Col>
                        <span style={{ fontFamily: "cursive" }}> {contactItem.userName}</span>
                    </Col>
                </Row>

            </>,
            description: contentDetail,
            duration: 10,
            icon: <img style={{ height: "16px" }} src={imgurl}></img>,
            placement: "topRight"
        };
        notification.open(args);
    }

    const getContactItemsForMenu = () => contactItems.filter((item: UserModel) => {
        if (item.userName.includes(searchItem))
            return item;
    }).map((contactItem: UserModel) => {
        const contentContact = <Menu.Item
            key={contactItem.userName}
            style={{ color: contactItem.color }}
            onClick={() => handleOnTitleClick(contactItem.userName)}
        >
            {contactItem.userName}
        </Menu.Item>

        return contentContact;
    });

    const handleSearch = () => {
        const value = $("#searchUser").val() ? $("#searchUser").val().toString() : "";
        setSearchItem(value);
    }

    return (
        <>
            {
                <Col xs={6} sm={6} md={3} lg={3} xl={3} className=" chat card mb-sm-3 mb-md-0 contacts_card"
                    style={{ height: "100%" }}>
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control search" placeholder="Search" id="searchUser" onKeyDown={handleSearch}></input>
                    </div>

                    <Menu mode="inline"
                        inlineIndent={24}
                        className={"chat-menu"}
                    >
                        {getContactItemsForMenu()}
                    </Menu>
                </Col>
            }
        </>
    )
}

const mapStateToProps = (state: any) => {
    const startedChatUser = state.startChat;
    const user = state.user;
    const blockedUsers = state.blockedUsers;
    return { user, blockedUsers, startedChatUser };
};

export default connect(mapStateToProps, {
    addChat,
    removeChat,
    addBlockedUser,
    removeBlockedUser
})(Users);
