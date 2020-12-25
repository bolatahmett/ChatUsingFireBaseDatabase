import { database } from "../components/firebase";

export const chatMessagesListener = (userName: any, addChatMessage: any) => {
    const ref = database.ref("chats");

    // ref.orderByChild("timestamp").limitToFirst(2).once('value').then(function (snapshot) {
    //     snapshot.ref.remove();
    // });

    ref.on('child_added', (snapshot: any) => {
        var data = snapshot.val();
        debugger;
        if (data.from == userName) {
            addChatMessage({
                key: snapshot.key,
                message: data.message,
                timeOfMessage: data.timeOfMessage,
                to: data.to,
                from: data.from
            } as ChatMessageModel);
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
                            gender: data.gender
                        } as ChatMessageModel);
                    }
                });
        }
    });
}