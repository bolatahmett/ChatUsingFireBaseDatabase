import React, { useEffect, useState } from 'react'
import '../index.css';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import Users from './Users';
import { database } from './firebase';

export default function Chat(props: any) {

    const [messageItems, setMessageItems] = useState([]);
    const [contactItems, setContactItem] = useState([]);

    const userLoad = () => {
        database.ref("users").on('value', (snapshot: any) => {
            let changedContextItems: any = [];
            snapshot.forEach((childSnapshot: any) => {
                var data = childSnapshot.val();
                if (data.online === 1) {
                    changedContextItems.push(data);
                }
            });
            setContactItem(changedContextItems);
        });
    }

    const chatYukle = (userName: any) => {

        database.ref("chats").on('child_added', (snapshot: any) => {
            var data = snapshot.val();
            if (data.from == userName) {
                const addedMessage = {
                    key: snapshot.key,
                    message: data.message,
                    timeOfMessage: data.timeOfMessage
                };

                setMessageItems(prevMessages => ([...prevMessages, addedMessage]));

            } else {
                var ref = database.ref("users/" + data.from);
                ref.once("value")
                    .then((snapshot: any) => {
                        if (snapshot.exists()) {
                            const addedMessage = {
                                key: snapshot.key,
                                from: data.from,
                                message: data.message,
                                timeOfMessage: data.timeOfMessage,
                                color: data.color,
                                sex: data.sex
                            };
                            setMessageItems(prevMessages => ([...prevMessages, addedMessage]));
                        }
                    });
            }

            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
        });
    }

    useEffect(() => {
        debugger;
        userLoad();
        chatYukle(props.userName);
    }, []);

    return (
        <div id="chatEkrani" className="row" style={{ height: "100%", display: "none" }} >
            <div className="col-9 chat" style={{ height: "100%", paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="card" style={{ height: "100%" }}>
                    <ChatHeader></ChatHeader>
                    <ChatContent messageItems={messageItems}></ChatContent>
                    <ChatFooter></ChatFooter>
                </div>
            </div>
            <Users contacts={contactItems}></Users>
        </div>
    )
}
