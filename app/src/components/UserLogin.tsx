import React from 'react'
import { getColor, getGlobalUserInfo, setOnline } from "../helper/helper";
import { database } from './firebase';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/action';
import { addChat } from '../redux/actions/action';
import { message, Form, Input, Button, Row, Col, Select, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

interface UserLoginProps {
    loginUser: any;
    addChat: any;
}

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

function UserLogin(props: UserLoginProps) {

    const onFinish = (values: LoginModel) => {
        login(values);
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
            gender: user.gender,
            online: 1,
            color: user.color,
            ip: user.ip,
            heigth: user.heigth,
            weight: user.weight,
            fleshColored: user.fleshColored,
            expectations: user.expectations
        });
    }

    const login = (loginInfo: LoginModel) => {
        const password = loginInfo.password ?? "";
        var ip = getGlobalUserInfo();
        let user: UserModel = {
            key: "",
            userName: loginInfo.userName,
            password: "",
            ip: ip,
            gender: loginInfo.gender,
            color: "",
            heigth: loginInfo.heigth ?? "",
            weight: loginInfo.weight ?? "",
            fleshColored: loginInfo.fleshColored ?? "",
            expectations: loginInfo.expectations ?? "",
            online: loginInfo.online
        };

        var ref = database.ref("blockedusers/" + ip);
        ref.once("value", (snapshot: { exists: () => any; }) => {
            if (snapshot.exists()) {
                message.warning("Kullanıcı girişi yasaklandı!!!");
            } else {

                let ref = database.ref("users/" + user.userName);
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
                                setOnline(user.userName, 1);
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
        <>
            <Row id="girisEkrani" justify="center" className={"vertical-center"}>
                <Col xs={20} sm={20} md={16} lg={12} xl={6} >
                    <div className="d-flex bd-highlight">
                        <div className="user_info">
                            <span style={{ fontFamily: "cursive" }}>Keyfili Sohbetler</span>
                        </div>
                    </div>
                    <Divider></Divider>
                    <Form
                        name={"LoginForm"}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item name="userName"
                            rules={[{ required: true, message: 'Lütfen kullanıcı adı giriniz!' }]}>
                            <Input placeholder={"Kullanıcı Adı"} prefix={<UserOutlined className="site-form-item-icon" />} />
                        </Form.Item>

                        <Form.Item name="password">
                            <Input.Password placeholder={"Şifre (Opsiyonel)"} />
                        </Form.Item>
                        <Row justify={"center"} gutter={[4, 4]}>
                            <Col span={12}>
                                <Form.Item name="gender" rules={[{ required: true, message: 'Cinsiyet seciniz!' }]}>
                                    <Select
                                        placeholder="Cinsiyet"
                                        allowClear
                                        style={{ textAlign: "center" }}
                                    >
                                        <Option value="woman"><img style={{ height: "32px" }} src={"../images/woman.png"}></img></Option>
                                        <Option value="man"><img style={{ height: "32px" }} src="../images/man.png"></img></Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="fleshColored">
                                    <Select
                                        placeholder="Ten rengi"
                                        allowClear
                                        style={{ textAlign: "center" }}
                                    >
                                        <Option value="Beyaz">Beyaz</Option>
                                        <Option value="Kumral">Kumral</Option>
                                        <Option value="Esmer">Esmer</Option>
                                        <Option value="Buğday">Buğday</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify={"center"} gutter={[4, 4]}>
                            <Col span={12}>
                                <Form.Item name="heigth" >
                                    <Input placeholder={"Boy (cm)"} style={{ textAlign: "center" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="weight" >
                                    <Input placeholder={"Kilo (cm)"} style={{ textAlign: "center" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col span={24}>
                                <Form.Item name={'expectations'} label="Beklentiler">
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider></Divider>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>Giriş</Button>
                        </Form.Item>
                    </Form>
                    <Divider></Divider>
                </Col>
            </Row>
        </>

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
