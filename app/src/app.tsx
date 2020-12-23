import React from 'react';
import './index.css';
import UserLogin from './components/UserLogin';
import Chat from './components/chat';
import { connect } from 'react-redux';
import UserContext from './components/UserContext';
import ErrorBoundary from './components/ErrorBoundary';

interface AppProps {
    firebase: any;
    database: any;
    user: UserModel;
}


function App(props: AppProps) {
    return (
        <>
            <ErrorBoundary
                // @ts-ignore
                fallbackRender={({ error, resetErrorBoundary, componentStack }) => (
                    <div>
                        <h1>An error occurred: {error.message}</h1>
                        <button onClick={resetErrorBoundary}>Try again</button>
                    </div>
                )}
            >
                <UserLogin></UserLogin>
                {props.user &&
                    <UserContext.Provider value={{ user: props.user }}>
                        <Chat />
                    </UserContext.Provider>
                }
            </ErrorBoundary>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, null)(App);