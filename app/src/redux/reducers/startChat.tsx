const startChat = (state = "Genel", action: { type: any; userName: string }) => {
    switch (action.type) {
        case 'ADD_CHAT':
            return action.userName;
        default:
            return state;
    }
}

export default startChat;