import React, { useState } from 'react'
import { getColor, getGlobalUserInfo, setOnline, setUserInfoSessionStorage } from "../helper/helper";
import { database } from './firebase';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/action';
import { addChat } from '../redux/actions/action';
import { Radio, message, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface UserLoginProps {
    loginUser: any;
    addChat: any;
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function UserLogin(props: UserLoginProps) {


    const onFinish = (values: any) => {
        console.log('Success:', values);
        login(values.username, values.password, values.sexOption);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const loadChat = (userName: any, color: string) => {
        props.loginUser(userName);
        props.addChat("Genel");
        $("#girisEkrani").hide();
        $("#chatEkrani").show();
    }

    const saveUser = (user: { userName: any; password: any; ip: any; sex: any; color: any; }) => {
        var userKey = database.ref("users/" + user.userName).push().key; //Rastgele bir userkey gönderir.
        database.ref("users/" + user.userName).set({
            username: user.userName,
            password: user.password,
            kulid: userKey,
            sex: user.sex,
            online: 1,
            color: user.color,
            ip: user.ip
        });
    }

    const login = (userName: string, password: string, sex: string) => {
        password = password === undefined ? "" : password;
        var ip = getGlobalUserInfo();
        var user = {
            userName: userName,
            password: password,
            ip: ip,
            sex: sex,
            color: ""
        };

        var ref = database.ref("blockedusers/" + ip);
        ref.once("value", (snapshot: { exists: () => any; }) => {
            if (snapshot.exists()) {
                message.warning("Kullanıcı girişi yasaklandı!!!");
            } else {

                var ref = database.ref("users/" + userName);
                ref.once("value")
                    .then((snapshot: any) => {
                        var name = snapshot.child("username").val() as unknown as string;
                        var color = snapshot.child("color").val() as unknown as string;
                        user.color = getColor();
                        if (name === null) {
                            saveUser(user);
                            setUserInfoSessionStorage(user);
                            loadChat(userName, user.color);
                        } else if (snapshot.child("online").val() == 1) {
                            message.warning("Kullanıcı şuan online. Farklı bir kullanıcı ile giriş yapınız!");
                        } else {

                            var pass = snapshot.child("password").val();
                            if (pass === 0 || (pass === password)) {
                                setOnline(userName, 1);
                                loadChat(userName, color);
                                user.color = user.color ? user.color : getColor();
                                setUserInfoSessionStorage(user);
                            } else {
                                message.warning("Hatalı şifre!");
                            }
                        }
                    });
            }
        });
    }

    return (
        <div id="girisEkrani" className="row vertical-center">
            <div className="col-md-4 offset-md-4">
                <h3 style={{ fontFamily: "cursive", textAlign: "center" }}>Chat</h3>
                <Form
                    name={"LoginForm"}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="username"
                        rules={[{ required: true, message: 'Lütfen kullanıcı adı giriniz!' }]} >
                        <Input placeholder={"Kullanıcı Adı"} prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item name="password" >
                        <Input.Password placeholder={"Şifre"} />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="sexOption"
                        rules={[{
                            required: true, message: 'Lütfen bir öğe seçin!'
                        }]}
                    >
                        <Radio.Group>
                            <Radio value={"woman"}> <img style={{ height: "32px" }} src={"../images/woman.png"}></img></Radio>
                            <Radio value={"man"}><img style={{ height: "32px" }} src="../images/man.png"></img></Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" block>Giriş</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, {
    loginUser,
    addChat
})(UserLogin);
