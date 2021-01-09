const chatMessages = (state: ChatMessageModel[] = [], action: { type: any; messageContent: ChatMessageModel }) => {
    switch (action.type) {
        case 'ADD_CHAT_MESSAGES':
            return [...state, action.messageContent];
        default:
            return state;
    }
}

export default chatMessages;