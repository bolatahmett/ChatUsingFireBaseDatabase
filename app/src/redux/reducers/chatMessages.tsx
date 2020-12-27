const chatMessages = (state = "", action: { type: any; messageContent: ChatMessageModel }) => {
    switch (action.type) {
        case 'ADD_CHAT_MESSAGES':
            return action.messageContent
        default:
            return state;
    }
}
export default chatMessages;