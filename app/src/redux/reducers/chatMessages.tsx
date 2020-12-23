const chatMessages = (state = "", action: { type: any; messageContent: UserModel }) => {
    switch (action.type) {
        case 'ADD_CHAT_MESSAGES':
            return action.messageContent
        default:
            return state;
    }
}
export default chatMessages;