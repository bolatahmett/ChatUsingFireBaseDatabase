const startChat = (state: ChatUserModel[] = [], action: { type: any; userName: string }) => {
    debugger;
    switch (action.type) {
        case 'ADD_CHAT':
            const isExist = state.some((item: ChatUserModel) => item.key === action.userName);
            if (!isExist) {
                state.forEach((item: ChatUserModel) => { item.isActive = false });
                return [...state, {
                    key: action.userName, isActive: true, isMessageReceived: false
                }];
            } else {
                return [...state];
            }
        case 'REMOVE_CHAT':
            return state.filter((item: ChatUserModel) => item.key !== action.userName);
        case 'ACTIVATE_CHAT':
            state.forEach((item: ChatUserModel) => { item.isActive = false });
            state.forEach((item: ChatUserModel) => { if (item.key === action.userName) item.isActive = true; });
        default:
            return state;
    }
}

export default startChat;