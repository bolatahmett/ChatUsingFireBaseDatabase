import { database } from "../components/firebase";

export const chatMessagesListener = (userName: any, addChatMessage: any) => {

    // ref.orderByChild("timestamp").limitToFirst(2).once('value').then(function (snapshot) {
    //     snapshot.ref.remove();
    // });

    database.ref("chats").orderByChild("timestamp").on('child_added', (snapshot: any) => {
        var data = snapshot.val();
        if (data.from == userName) {
            addChatMessage({
                key: snapshot.key,
                message: data.message,
                timeOfMessage: data.timeOfMessage,
                to: data.to,
                from: data.from
            } as ChatMessageModel);
        } else {
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