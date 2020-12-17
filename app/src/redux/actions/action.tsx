export const loginUser = (userName: string) => ({
    type: 'LOGIN_USER',
    userName: userName
});

export const addChat = (userName: string) => ({
    type: 'ADD_CHAT',
    userName: userName
});

export const addChatMessages = (messageContent: any) => ({
    type: 'ADD_CHAT_MESSAGES',
    messageContent: messageContent
});