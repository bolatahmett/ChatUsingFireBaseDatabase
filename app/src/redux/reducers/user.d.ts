declare const user: (state: string, action: {
    type: any;
    user: UserModel;
}) => string | UserModel;
export default user;
