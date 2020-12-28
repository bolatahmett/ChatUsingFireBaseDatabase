declare const blockedUsers: (state: UserModel[], action: {
    type: any;
    user: UserModel;
}) => UserModel[];
export default blockedUsers;
