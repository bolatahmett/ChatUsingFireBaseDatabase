/// <reference types="react" />
interface ChatFooterProps {
    startedChatUser: ChatUserModel[];
}
declare function ChatFooter(props: ChatFooterProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof ChatFooter, Pick<ChatFooterProps, never>>;
export default _default;
