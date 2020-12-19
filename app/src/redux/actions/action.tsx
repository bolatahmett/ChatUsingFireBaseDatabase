export const loginUser = (user: UserModel) => ({
    type: 'LOGIN_USER',
    user: user
});

export const addChat = (userName: string) => ({
    type: 'ADD_CHAT',
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