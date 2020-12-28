const notification = (state: string[] = [], action: { type: any; userName: string }) => {
    switch (action.type) {
        case 'ADD_NOTIFACATION':
            const isExist = state.some((item: string) => item === action.userName);
            if (!isExist) {
                return [...state, action.userName];
            } else {
                return [...state];
            }
        case 'REMOVE_NOTIFACATION':
            return state.filter((item: string) => item !== action.userName);
        default:
            return state
    }
}

export default notification;