import { database } from "../components/firebase";

export const chatMessagesListener = (userName: any, addChatMessage: any) => {
    const ref = database.ref("chats");
    ref.on('child_added', (snapshot: any) => {
        var data = snapshot.val();

        if (data.from == userName) {
            addChatMessage({
                key: snapshot.key,
                message: data.message,
                timeOfMessage: data.timeOfMessage,
                to: data.to,
                from: data.from
            });
        } else {
            var ref = database.ref("users/" + data.from);
            ref.once("value")
                .then((snapshot: any) => {
                    if (snapshot.exists()) {
                        addChatMessage({
                            key: snapshot.key,
                            from: data.from,
                            to: data.to,
                            message: data.message,
                            timeOfMessage: data.timeOfMessage,
                            color: data.color,
                            sex: data.sex
                        });
                    }
                });
        }
    });
}