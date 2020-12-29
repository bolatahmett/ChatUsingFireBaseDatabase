export declare const loginUser: (user: UserModel) => {
    type: string;
    user: UserModel;
};
export declare const addChat: (chatUserModel: ChatUserModel) => {
    type: string;
    chatUserModel: ChatUserModel;
};
export declare const removeChat: (chatUserModel: ChatUserModel) => {
    type: string;
    chatUserModel: ChatUserModel;
};
export declare const activateChat: (chatUserModel: ChatUserModel) => {
    type: string;
    chatUserModel: ChatUserModel;
};
export declare const addChatMessages: (messageContent: ChatMessageModel) => {
    type: string;
    messageContent: ChatMessageModel;
};
export declare const addBlockedUser: (user: UserModel) => {
    type: string;
    user: UserModel;
};
export declare const removeBlockedUser: (user: UserModel) => {
    type: string;
    user: UserModel;
};
export declare const addNotification: (userName: string) => {
    type: string;
    userName: string;
};
export declare const removeNotification: (userName: string) => {
    type: string;
    userName: string;
};
