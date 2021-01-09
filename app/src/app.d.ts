/// <reference types="react" />
import '../src/index.css';
interface AppProps {
    firebase: any;
    database: any;
    user: UserModel;
}
declare function App(props: AppProps): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof App, Pick<AppProps, "firebase" | "database">>;
export default _default;
