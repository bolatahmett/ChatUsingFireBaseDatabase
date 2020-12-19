const user = (state = "", action: { type: any; user: UserModel }) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.user;
        default:
            return state
    }
}

export default user;