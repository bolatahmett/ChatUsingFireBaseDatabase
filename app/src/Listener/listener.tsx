import { database } from "../components/firebase";

export const chatMessagesListener = (userName: any, addChatMessage: any) => {

    // ref.orderByChild("timestamp").limitToFirst(2).once('value').then(function (snapshot) {
    //     snapshot.ref.remove();
    // });

    var ref = database.ref("chats")
    ref.once('value').then((dataSnapshot) => {
        return dataSnapshot.numChildren()
    }).then((count) => {
        ref.on('child_added', (snapshot) => {
            if (count > 0) {
                count--
                return;
            }
            var data = snapshot.val();
            addChatMessage({
                key: snapshot.key,
                from: data.from,
                to: data.to,
                message: data.message,
                timeOfMessage: data.timeOfMessage,
                color: data.color,
                gender: data.gender
            } as ChatMessageModel);
        });
    });
}

export const sharingListener = (userName: any, sharePlayer: any) => {

    // ref.orderByChild("timestamp").limitToFirst(2).once('value').then(function (snapshot) {
    //     snapshot.ref.remove();
    // });

    var ref = database.ref("share")
    ref.once('value').then((dataSnapshot) => {
        return dataSnapshot.numChildren()
    }).then((count) => {
        ref.on('child_added', (snapshot) => {
            if (count > 0) {
                count--
                return;
            }
            var data = snapshot.val();
            sharePlayer({
                key: snapshot.key,
                url: data.url,
                from: data.from,
                to: data.to
            } as ShareModel);
        });
    });
}