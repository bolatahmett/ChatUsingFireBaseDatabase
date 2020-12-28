export declare const loginUser: (user: UserModel) => {
    type: string;
    user: UserModel;
};
export declare const addChat: (userName: any) => {
    type: string;
    userName: any;
};
export declare const removeChat: (userName: string) => {
    type: string;
    userName: string;
};
export declare const activateChat: (userName: string) => {
    type: string;
    userName: string;
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
