import React from 'react';
import './index.css';
import UserLogin from './components/UserLogin';
import Chat from './components/chat';
import { connect } from 'react-redux';
import UserContext from './components/UserContext';

interface AppProps {
    firebase: any;
    database: any;
    user: UserModel;
}


function App(props: AppProps) {
    return (
        <>
            <div className="container-fluid" style={{ height: "100%" }}>
                <UserLogin></UserLogin>
                {props.user &&
                    <UserContext.Provider value={{ user: props.user }}>
                        <Chat />
                    </UserContext.Provider>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    const user = state.user;
    return { user };
};

export default connect(mapStateToProps, null)(App);