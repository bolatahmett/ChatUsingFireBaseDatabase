import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FirebaseContext from './components/FirebaseContext';
import firebase, { database } from './components/firebase';
import UserLogin from './components/UserLogin';
import Chat from './components/chat';

interface AppProps {
    firebase: any;
    database: any;
}

export default function App(props: AppProps) {

    const [userName, setUserName] = useState(undefined)

    return (
        <>
            <div className="container-fluid" style={{ height: "100%" }}>
                <UserLogin setUserName={setUserName}></UserLogin>
                {userName && <Chat userName={userName}></Chat>}
            </div>
        </>
    )

}


// @ts-ignore
ReactDOM.render(<FirebaseContext.Provider value={firebase}>
    <App firebase={firebase} database={database} />
</FirebaseContext.Provider>, document.getElementById('app'))