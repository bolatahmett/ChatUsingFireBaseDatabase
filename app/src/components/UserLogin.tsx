import React from 'react'
import { getColor, getGlobalUserInfo, setOnline, setUserInfoSessionStorage } from "../helper/helper";
import { database } from './firebase';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/action';
import { addChat } from '../redux/actions/action';
import { Radio, message, Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface UserLoginProps {
    loginUser: any;
    addChat: any;
}

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

function UserLogin(props: UserLoginProps) {

    const onFinish = (values: LoginModel) => {
        login(values.username, values.password, values.sexOption);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const loadChat = (user: UserModel) => {
        props.loginUser(user);
        props.addChat("Genel");
        $("#girisEkrani").hide();
        $("#chatEkrani").show();
    }

    const saveUser = (user: UserModel) => {
        var userKey = database.ref("users/" + user.userName).push().key; //Rastgele bir userkey gönderir.
        database.ref("users/" + user.userName).set({
            userName: user.userName,
            password: user.password,
            key: userKey,
            sex: user.sex,
            online: 1,
            color: user.color,
            ip: user.ip
        });
    }

    const login = (userName: string, password: string, sex: SexOption) => {
        password = password === undefined ? "" : password;
        var ip = getGlobalUserInfo();
        let user: UserModel = {
            key: "",
            userName: userName,
            password: "",
            ip: ip,
            sex: sex.toString(),
            color: ""
        };

        var ref = database.ref("blockedusers/" + ip);
        ref.once("value", (snapshot: { exists: () => any; }) => {
            if (snapshot.exists()) {
                message.warning("Kullanıcı girişi yasaklandı!!!");
            } else {

                let ref = database.ref("users/" + userName);
                ref.once("value")
                    .then((snapshot: any) => {
                        let name = snapshot.child("username").val() as unknown as string;
                        let color = snapshot.child("color").val() as unknown as string;
                        user.color = color ? color : getColor();

                        if (name === null) {
                            saveUser(user);
                        } else if (snapshot.child("online").val() == 1) {
                            message.warning("Kullanıcı şuan online. Farklı bir kullanıcı ile giriş yapınız!");
                            return;
                        } else {
                            var passwordFromDb = snapshot.child("password").val();
                            if (passwordFromDb === 0 || (passwordFromDb === password)) {
                                setOnline(userName, 1);
                            } else {
                                message.warning("Hatalı şifre!");
                                return;
                            }
                        }

                        loadChat(user);
                    });
            }
        });
    }

    return (

        <Row id="girisEkrani" justify="center" className={"vertical-center"}>
            <Col xs={20} sm={20} md={16} lg={12} xl={6} >
                <Form
                    name={"LoginForm"}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="username"
                        rules={[{ required: true, message: 'Lütfen kullanıcı adı giriniz!' }]}>
                        <Input placeholder={"Kullanıcı Adı"} prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item name="password">
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Giriş</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
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
