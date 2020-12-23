export const loginUser = (user: UserModel) => ({
    type: 'LOGIN_USER',
    user: user
});

export const addChat = (userName: any) => ({
    type: 'ADD_CHAT',
    userName: userName
});

export const removeChat = (userName: string) => ({
    type: 'REMOVE_CHAT',
    userName: userName
});

export const activateChat = (userName: string) => ({
    type: 'ACTIVATE_CHAT',
    userName: userName
});

export const addChatMessages = (messageContent: any) => ({
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