/// <reference types="react" />
import 'antd/dist/antd.css';
interface ChatContentProps {
    addChatMessages: any;
    chatMessages: ChatMessageModel[];
    addChat: any;
    startedChatUser: ChatUserModel[];
    activateChat: any;
    removeChat: any;
}
declare function ChatContent(props: ChatContentProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof ChatContent, Pick<ChatContentProps, never>>;
export default _default;
