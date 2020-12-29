export const loginUser = (user: UserModel) => ({
    type: 'LOGIN_USER',
    user: user
});

export const addChat = (chatUserModel: ChatUserModel) => ({
    type: 'ADD_CHAT',
    chatUserModel: chatUserModel
});

export const removeChat = (chatUserModel: ChatUserModel) => ({
    type: 'REMOVE_CHAT',
    chatUserModel: chatUserModel
});

export const activateChat = (chatUserModel: ChatUserModel) => ({
    type: 'ACTIVATE_CHAT',
    chatUserModel: chatUserModel
});

export const addChatMessages = (messageContent: ChatMessageModel) => ({
    type: 'ADD_CHAT_MESSAGES',
    messageContent: messageContent
});

export const addBlockedUser = (user: UserModel) => ({
    type: 'ADD_BLOCKED_USER',
    user: user
});

export const removeBlockedUser = (user: UserModel) => ({
    type: 'REMOVE_BLOCKED_USER',
    user: user
});


export const addNotification = (userName: string) => ({
    type: 'ADD_NOTIFACATION',
    userName: userName
});

export const removeNotification = (userName: string) => ({
    type: 'REMOVE_NOTIFACATION',
    userName: userName
});
