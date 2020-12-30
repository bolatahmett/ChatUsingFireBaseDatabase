
const startChat = (state: ChatUserModel[] = [], action: { type: any; chatUserModel: ChatUserModel }) => {
    switch (action.type) {
        case 'ADD_CHAT':
            const isExist = state.some((item: ChatUserModel) => item.key === action.chatUserModel.key);
            if (!isExist) {
                state.forEach((item: ChatUserModel) => { item.isActive = false });
                return [...state, {
                    key: action.chatUserModel.key,
                    isActive: action.chatUserModel.isActive,
                    isMessageReceived: action.chatUserModel.isMessageReceived
                }];
            } else {
                return [...state];
            }
        case 'REMOVE_CHAT':
            const result = state.filter((item: ChatUserModel) => item.key !== action.chatUserModel.key);
            return result.filter((item: ChatUserModel, index: number) => {
                item.isActive = index === result.length - 1;
                return item;
            });
        case 'ACTIVATE_CHAT':
            const resultActiveChat = state.slice();
            resultActiveChat.forEach((item: ChatUserModel) => { item.isActive = false });
            resultActiveChat.forEach((item: ChatUserModel) => { if (item.key === action.chatUserModel.key) item.isActive = true; item.isMessageReceived = false });
            return resultActiveChat;
        default:
            return state;
    }
}

export default startChat;