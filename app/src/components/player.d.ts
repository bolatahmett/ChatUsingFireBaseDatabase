/// <reference types="react" />
import 'antd/dist/antd.css';
import 'ant-design-draggable-modal/dist/index.css';
interface VideoPlayerProps {
    visible: boolean;
    handleCancel: any;
    startedChatUser: ChatUserModel[];
    shareInfo: ShareModel;
}
declare function VideoPlayer(props: VideoPlayerProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof VideoPlayer, Pick<VideoPlayerProps, "visible" | "handleCancel" | "shareInfo">>;
export default _default;
