declare const startChat: (state: ChatUserModel[], action: {
    type: any;
    userName: string;
}) => ChatUserModel[];
export default startChat;
