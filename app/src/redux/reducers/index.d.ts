declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    user: string | UserModel;
    startChat: ChatUserModel[];
    chatMessages: ChatMessageModel[];
    blockedUsers: UserModel[];
    notification: string[];
}>, import("redux").AnyAction>;
export default _default;
