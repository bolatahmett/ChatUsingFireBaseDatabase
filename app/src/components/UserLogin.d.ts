/// <reference types="react" />
interface UserLoginProps {
    loginUser: any;
    addChat: any;
}
declare function UserLogin(props: UserLoginProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof UserLogin, Pick<UserLoginProps, never>>;
export default _default;
