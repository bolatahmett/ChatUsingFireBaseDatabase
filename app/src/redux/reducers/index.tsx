import { combineReducers } from 'redux'
import user from './user';
import startChat from './startChat';
import chatMessages from './chatMessages';
import blockedUsers from './blockedUsers';
import notification from './notification';

export default combineReducers({
    user,
    startChat,
    chatMessages,
    blockedUsers,
    notification
});