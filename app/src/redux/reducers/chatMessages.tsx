const chatMessages = (state = "", action: { type: any; messageContent: string }) => {
    switch (action.type) {
        case 'ADD_CHAT_MESSAGES':
            return action.messageContent
        default:
            return state;
    }
}
export default chatMessages;