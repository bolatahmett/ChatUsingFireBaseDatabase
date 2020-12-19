import { combineReducers } from 'redux'
import user from './user';
import startChat from './startChat';
import chatMessages from './chatMessages';
import blockedUsers from './blockedUsers';

export default combineReducers({
    user,
    startChat,
    chatMessages,
    blockedUsers
});