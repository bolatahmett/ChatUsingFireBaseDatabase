/// <reference types="react" />
interface MessageContentProps {
    blockedUsers?: UserModel[];
    chatMessages: ChatMessageModel[];
    chatKey: string;
    notification: string[];
}
declare function MessageContent(props: MessageContentProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof MessageContent, Pick<MessageContentProps, "chatKey">>;
export default _default;
