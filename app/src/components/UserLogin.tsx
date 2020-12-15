import React from 'react'
import { getColor, getGlobalUserInfo, setOnline, setUserInfoSessionStorage } from "../helper/helper";
import { database } from './firebase';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/action';

interface UserLoginProps {
    loginUser: any;
}

function UserLogin(props: UserLoginProps) {

    const loadChat = (userName: any, color: string) => {
        props.loginUser(userName);
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

    const login = () => {
        var userName = $("#kadi").val() as string;
        var password = $("#password").val();
        var ip = getGlobalUserInfo();
        var sex = $('input[name=sexOption]:checked').val();
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
                alert("Kullanıcı girişi yasaklandı!!!");
            } else {
                if (userName != "") {
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
                                user.userName = user.userName + "_";
                                saveUser(user);
                                setUserInfoSessionStorage(user);
                                loadChat(user.userName, user.color);
                            } else {

                                var pass = snapshot.child("password").val();
                                if (pass === 0 || (pass === password)) {
                                    setOnline(userName, 1);
                                    loadChat(userName, color);
                                    user.color = user.color ? user.color : getColor();
                                    setUserInfoSessionStorage(user);
                                } else {
                                    alert("Şifre hatalı");
                                }
                            }
                        });
                } else {
                    alert("Kullanıcı adını boş bırakmayınız!");
                }
            }
        });
    }

    return (
        <div id="girisEkrani" className="row vertical-center">
            <div className="col-md-4 offset-md-4">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="kullanici_adi">@</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Kullanıcı adı giriniz"
                        aria-label="Kullanıcı adı giriniz" aria-describedby="kullanici_adi" id="kadi"
                        style={{ fontSize: "0.75rem !important" }}></input>

                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Şifre (opsiyonel)"
                        aria-label="Şifre giriniz (opsiyonel)" aria-describedby="password" id="password"
                        style={{ fontSize: "0.75rem !important" }}></input>
                </div>
                <div className="input-group mb-3">
                    <div className="form-check col-6">
                        <input className="form-check-input" type="radio" name="sexOption" id="woman" value="woman" checked></input>
                        <label className="form-check-label" htmlFor="woman">
                            <img style={{ height: "32px" }} src="../images/woman.png"></img>
                        </label>
                    </div>
                    <div className="form-check col-6">
                        <input className="form-check-input" type="radio" name="sexOption" id="man" value="man"></input>
                        <label className="form-check-label" htmlFor="man">
                            <img style={{ height: "32px" }} src="../images/man.png"></img>
                        </label>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="form-check col-6">
                        <input className="form-check-input" type="radio" name="sexOption" id="lesbian" value="lesbian"></input>
                        <label className="form-check-label" htmlFor="lesbian">
                            Lezbiyen
                        </label>
                    </div>
                    <div className="form-check col-6">
                        <input className="form-check-input" type="radio" name="sexOption" id="gay" value="gay"></input>
                        <label className="form-check-label" htmlFor="gay">
                            Gay
                        </label>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <button type="button" onClick={login.bind(this)} className="form-control btn btn-success">Giriş Yap</button>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    debugger;
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, {
    loginUser
})(UserLogin);
