import React, { useEffect } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { database } from './firebase';

export default function Chat(props: any) {

    const userLoad = () => {
        var query = database.ref("users");
        query.on('value', (snapshot: any) => {
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

    const chatYukle = (userName: any) => {
        var query = database.ref("chats");
        // query.on('child_removed',  (snapshot) {
        //     $("#mesajAlani").html("");
        //     console.log("removed");
        // });

        query.on('child_added', (snapshot: { val: () => any; key: string; }) => {
            var data = snapshot.val();
            if (data.from == userName) {
                //Mesaj bizim tarafımızdan gönderilmişse bu alan çalışacak

                const mesaj = `<div className="d-flex justify-content-end">
                <div className="alert message-me" role="alert" onClick={()=>showTimeOfMessage('`+ snapshot.key + `')} >` + data.message + `<div id="timeOfMessage` + snapshot.key + `" style="display:none" >` + data.timeOfMessage + `</div></div>
                 </div>`;

                $("#mesajAlani").append(mesaj);
            } else {

                var ref = database.ref("users/" + data.from);
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

    useEffect(() => {
        userLoad();
        chatYukle(props.userName);
    });

    return (
        <div id="chatEkrani" className="row" style={{ height: "100%", display: "none" }} >

            <div className="col-9 chat" style={{ height: "100%", paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="card" style={{ height: "100%" }}>
                    <ChatHeader></ChatHeader>
                    <ChatContent></ChatContent>
                    <ChatFooter></ChatFooter>
                </div>
            </div>
            <Users></Users>
        </div>
    )
}
