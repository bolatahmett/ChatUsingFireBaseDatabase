import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FirebaseContext from './components/FirebaseContext';
import firebase, { database } from './components/firebase';

interface AppProps {
    firebase: any;
    database: any;
}

export default class App extends React.Component<AppProps> {

    constructor(props: any) {
        super(props);
    }

    setUserInfoSessionStorage(user: { userName: any; password?: any; ip?: string; sex: any; color: any; }) {
        sessionStorage.setItem("userInfo", JSON.stringify({ userName: user.userName, color: user.color, sex: user.sex }));
    }

    getUserInfoFromStorage() {
        return JSON.parse(sessionStorage.getItem("userInfo")!);
    }

    clearHistory() {
        $("#mesajAlani").html("");
    }

    clearHistoryFromDb() {
        var query = this.props.database.ref("chats");
        query.remove();
    }

    setOnline(userName: string, isOnline: number) {
        this.props.database.ref("users/" + userName + "/online").set(isOnline);
    }

    saveUser(user: { userName: any; password: any; ip: any; sex: any; color: any; }) {
        var userKey = this.props.database.ref("users/" + user.userName).push().key; //Rastgele bir userkey gönderir.
        this.props.database.ref("users/" + user.userName).set({
            username: user.userName,
            password: user.password,
            kulid: userKey,
            sex: user.sex,
            online: 1,
            color: user.color,
            ip: user.ip
        });
    }

    addBlockedIp(ip: string, userName: string) {

        var key = this.props.database.ref("blockedusers/" + ip).push().key; //Rastgele bir userkey gönderir.
        this.props.database.ref("blockedusers/" + ip).set({
            ip: ip,
            key: key,
        });
        alert("User blocked");

        var query = this.props.database.ref("blockedusers");
        query.on('child_added', (snapshot: { val: () => any; }) => {
            var data = snapshot.val();
            if (data.ip === this.getGlobalUserInfo) {
                $("#mesaj").attr('disabled', 'disabled');
            }
        });
        var ref = this.props.database.ref("users/" + userName);
        ref.remove();
    }

    loadChat(userName: any, color: string) {

        $("#girisEkrani").hide();
        $("#chatEkrani").show();
        this.chatYukle(userName);
        this.userLoad();
    }

    login() {

        var userName = $("#kadi").val() as string;
        var password = $("#password").val();
        var ip = this.getGlobalUserInfo();
        var sex = $('input[name=sexOption]:checked').val();
        var user = {
            userName: userName,
            password: password,
            ip: ip,
            sex: sex,
            color: ""
        };

        var ref = this.props.database.ref("blockedusers/" + ip);
        ref.once("value", (snapshot: { exists: () => any; }) => {
            if (snapshot.exists()) {
                alert("Kullanıcı girişi yasaklandı!!!");
            } else {
                if (userName != "") {
                    var ref = this.props.database.ref("users/" + userName);
                    ref.once("value")
                        .then((snapshot: { child: (arg0: string) => { (): any; new(): any; val: { (): number; new(): any; }; }; }) => {
                            var name = snapshot.child("username").val() as unknown as string;
                            var color = snapshot.child("color").val() as unknown as string;
                            user.color = this.getColor();
                            if (name === null) {
                                this.saveUser(user);
                                this.setUserInfoSessionStorage(user);
                                this.loadChat(userName, user.color);
                            } else if (snapshot.child("online").val() == 1) {
                                user.userName = user.userName + "_";
                                this.saveUser(user);
                                this.setUserInfoSessionStorage(user);
                                this.loadChat(userName, user.color);
                            } else {

                                var pass = snapshot.child("password").val();
                                if (pass === 0 || (pass === password)) {
                                    this.setOnline(userName, 1);
                                    this.loadChat(userName, color);
                                    user.color = user.color ? user.color : this.getColor();
                                    this.setUserInfoSessionStorage(user);
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

    mesajGonder() {
        var event = window.event;
        var mesaj = $("#mesaj").val();
        var userInfo = this.getUserInfoFromStorage();

        if (userInfo.userName != "" && mesaj != "") {
            var formattedTime = this.formatTime(new Date());
            var messageKey = this.props.database.ref("chats/").push().key;
            this.props.database.ref("chats/" + messageKey).set({
                message: mesaj,
                from: userInfo.userName,
                timeOfMessage: formattedTime,
                color: userInfo.color,
                sex: userInfo.sex
            });
            this.clearHistoryFromDb();
            $("#mesaj").val(' ');
            $("#mesaj").val('');
            event!.preventDefault();
            setTimeout(() => {
                $('#mesaj').focus();
            }, 0);
        } else {
            alert("Lütfen boş alan bırakmayınız!");
        }
        return false;
    }

    chatYukle(userName: any) {
        var query = this.props.database.ref("chats");
        // query.on('child_removed',  (snapshot) {
        //     $("#mesajAlani").html("");
        //     console.log("removed");
        // });

        query.on('child_added', (snapshot: { val: () => any; key: string; }) => {
            var data = snapshot.val();
            if (data.from == userName) {
                //Mesaj bizim tarafımızdan gönderilmişse bu alan çalışacak

                var mesaj = `<div className="d-flex justify-content-end">
                <div className="alert message-me" role="alert" onClick={showTimeOfMessage('`+ snapshot.key + `')} >` + data.message + `<div id="timeOfMessage` + snapshot.key + `" style="display:none" >` + data.timeOfMessage + `</div></div>
                 </div>`;

                $("#mesajAlani").append(mesaj);
            } else {

                var ref = this.props.database.ref("users/" + data.from);
                ref.once("value")
                    .then((snapshot: { exists: () => any; key: string; }) => {
                        if (snapshot.exists()) {
                            //Mesaj başkası tarafından gönderilmişse bu alan çalışacak
                            var imgurl = data.sex === "woman" ? "../images/woman.png" : "../images/man.png";
                            var mesaj = `<div className="d-flex">
                                    <div className="alert message-other" role="alert" onClick={showTimeOfMessage('`+ snapshot.key + `')}>
                                     <img style="height: 16px" src=`+ imgurl + `></img> <b style="color: ` + data.color + `" >` + data.from + `: </b> ` + data.message + `
                                <div id="timeOfMessage` + snapshot.key + `" style="display:none" >` + data.timeOfMessage + `</div>
                           </div>`;
                            $("#mesajAlani").append(mesaj);
                        }
                    });
            }
            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);

        });
    }

    userLoad() {
        var query = this.props.database.ref("users");
        query.on('value', (snapshot: any[]) => {
            $('#contacts').empty();
            snapshot.forEach((childSnapshot: { val: () => any; }) => {
                var data = childSnapshot.val();
                if (data.online === 1) {
                    var userContent = `<li fas className="active">
                                        <div className="user_info" onClick= {showUserOptions('`+ data.kulid + `')}>
                                            <p className="fas fa-user"" style="margin-top:revert; margin-bottom: revert; color: ` + data.color + `"> ` + data.username + `</p>
                                        </div>
                                        <div id="options`+ data.kulid + `" style="display:none; cursor: pointer;">
                                            <ul>
                                                <li onClick={addBlockedIp('` + data.ip + `','` + data.username + `')}><i className="fas fa-ban"></i> Engelle</li>
                                            </ul>
                                        </div>
                                    </li>`;
                    $("#contacts").append(userContent);
                }
            });
        });
    }

    showUserOptions(key: string) {
        var user = this.getUserInfoFromStorage();
        if (user.userName === "Ahmet") {
            if ($("#options" + key).is(":hidden")) {
                $("#options" + key).show();
            } else {
                $("#options" + key).hide();
            }
        }
    }

    onKeyPressMessage() {
        var event = window.event;
        // @ts-ignore
        var key = event.keyCode;
        if (key === 13) {
            event!.preventDefault();
            this.mesajGonder();
            return false;
        } else {
            return true;
        }
    }

    showMenu() {
        if ($("#action_menu").is(":hidden")) {
            $("#action_menu").show();
        } else {
            $("#action_menu").hide();
        }
    }


    getColor() {
        var myColors = [
            '#FF0000', '#800000', '#FFAF00', '#808000', '#00FF00', '#008000', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080'
        ];
        return myColors[Math.floor(Math.random() * myColors.length)];
    }

    showTimeOfMessage(key: string) {
        if ($("#timeOfMessage" + key).is(":hidden")) {
            $("#timeOfMessage" + key).show();
        } else {
            $("#timeOfMessage" + key).hide();
        }
    }

    formatTime(date: string | number | Date) {

        let d = new Date(date);

        var h: any = d.getHours(), m = d.getMinutes(), l = "AM";
        if (h > 12) {
            h = h - 12;
        }
        if (h < 10) {
            h = '0' + h;
        }

        if (d.getHours() >= 12) {
            l = "PM"
        } else {
            l = "AM"
        }

        let mString = m < 10 ? '0' + m : m;
        return h + ':' + mString + ' ' + l;

    }

    getGlobalUserInfo() {
        $.ajaxSetup({
            async: false
        });
        var ip = "";
        $.getJSON("https://api.ipify.org?format=json", (data: { ip: string; }) => {
            ip = data.ip
        });
        $.ajaxSetup({
            async: true
        });
        return ip.split('.').join('');
    }

    render() {
        return (
            <>
                <div className="container-fluid" style={{ height: "100%" }}>

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
                                <button type="button" onClick={this.login.bind(this)} className="form-control btn btn-success">Giriş Yap</button>
                            </div>
                        </div>
                    </div>
                    <div id="chatEkrani" className="row" style={{ height: "100%", display: "none" }} >

                        <div className="col-9 chat" style={{ height: "100%", paddingLeft: "0px", paddingRight: "0px" }}>
                            <div className="card" style={{ height: "100%" }}>
                                <div className="card-header msg_head">
                                    <div className="d-flex bd-highlight">
                                        <div className="user_info">

                                            <span style={{ fontFamily: "cursive" }}>Chat</span>
                                        </div>
                                    </div>
                                    <span id="action_menu_btn"><i className="fas fa-ellipsis-v" onClick={this.showMenu}></i></span>
                                    <div id="action_menu" className="action_menu">
                                        <ul>
                                            <li><i className="fas fa-user-circle"></i> Profil</li>
                                            <li><i className="fas fa-users"></i> Arkadaş Ekle</li>
                                            <li><i className="fas fa-plus"></i> Grup Ekle</li>
                                            <li><i className="fas fa-ban"></i> Engelle</li>
                                            <li onClick={this.clearHistory} > <i className="fas fa-trash"></i> Sohbeti Temizle</li>
                                            <li onClick={() => { this.showUserOptions("a") }}><i className="fas fa-filter"></i> Tercihler</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-body msg_card_body">
                                    <div id="mesajAlani" className="col-md-24">
                                    </div>
                                </div>
                                <div className="card-footer" id="card-footer">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                        </div>
                                        <textarea id="mesaj" name="mesaj" className="form-control type_msg"
                                            placeholder="Mesajınızı yazın..." onKeyPress={this.onKeyPressMessage}></textarea>
                                        <div className="input-group-append">
                                            <span className="input-group-text send_btn" onClick={this.mesajGonder}>Gönder</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 chat" style={{ height: "100%", paddingRight: "0px", paddingLeft: "0px" }}>
                            <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "100%" }}>

                                <div className="form-group has-search">
                                    <span className="fa fa-search form-control-feedback"></span>
                                    <input type="text" className="form-control search" placeholder="Search" name=""></input>
                                </div>

                                <div style={{ height: "100%" }}>
                                    <ul id="contacts" className="contacts">
                                    </ul>
                                </div>
                                <div className="card-footer"></div>

                            </div>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}


// @ts-ignore
ReactDOM.render(<FirebaseContext.Provider value={firebase}>
    <App firebase={firebase} database={database} />
</FirebaseContext.Provider>, document.getElementById('app'))