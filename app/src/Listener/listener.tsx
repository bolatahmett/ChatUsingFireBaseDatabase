import { database } from "../components/firebase";

export const chatMessagesListener = (userName: any, addChatMessage: any) => {

    database.ref("chats").on('child_added', (snapshot: any) => {
        var data = snapshot.val();

        if (data.from == userName) {
            const addedMessage = {
                key: snapshot.key,
                message: data.message,
                timeOfMessage: data.timeOfMessage,
                to: data.to,
                from: data.from
            };
            addChatMessage(addedMessage);
        } else {
            var ref = database.ref("users/" + data.from);
            ref.once("value")
                .then((snapshot: any) => {
                    if (snapshot.exists()) {
                        const addedMessage = {
                            key: snapshot.key,
                            from: data.from,
                            to: data.to,
                            message: data.message,
                            timeOfMessage: data.timeOfMessage,
                            color: data.color,
                            sex: data.sex
                        };
                        addChatMessage(addedMessage);
                    }
                });
        }
        $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
    });
}