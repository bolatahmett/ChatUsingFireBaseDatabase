/// <reference types="react" />
interface TabNotificationProps {
    tabTitle: string;
    hasNewMessage: boolean;
    userName: string;
    addNotification: any;
    removeNotification: any;
}
declare function TabNotification(props: TabNotificationProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof TabNotification, Pick<TabNotificationProps, "userName" | "tabTitle" | "hasNewMessage">>;
export default _default;
