const blockedUsers = (state: UserModel[] = [], action: { type: any; user: UserModel }) => {
    switch (action.type) {
        case 'ADD_BLOCKED_USER':
            return [...state, action.user];
        case 'REMOVE_BLOCKED_USER':
            return state.filter(item => item.userName !== action.user.userName);
        default:
            return state;
    }
}

export default blockedUsers;