const user = (state = "", action: { type: any; userName: string }) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.userName;
        default:
            return state
    }
}

export default user;