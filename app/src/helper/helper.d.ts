export declare const setUserInfoSessionStorage: (user: {
    userName: any;
    password?: any;
    ip?: string;
    gender: any;
    color: any;
}) => void;
export declare const getUserInfoFromStorage: () => any;
export declare const clearHistory: () => void;
export declare const clearHistoryFromDb: () => void;
export declare const setOnline: (userName: string, isOnline: number) => void;
export declare const addBlockedIp: (ip: string, userName: string) => void;
export declare const showUserOptions: (key: string, userName: string, thatUser: string) => void;
export declare const showMenu: () => void;
export declare const getColor: () => string;
export declare const showTimeOfMessage: (key: string) => void;
export declare const formatTime: (date: string | number | Date) => string;
export declare const getGlobalUserInfo: () => string;
