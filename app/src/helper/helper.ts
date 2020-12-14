import { database } from "../components/firebase";



export const setUserInfoSessionStorage = (user: { userName: any; password?: any; ip?: string; sex: any; color: any; }) => {
    sessionStorage.setItem("userInfo", JSON.stringify({ userName: user.userName, color: user.color, sex: user.sex }));
}

export const getUserInfoFromStorage = () => {
    return JSON.parse(sessionStorage.getItem("userInfo")!);
}

export const clearHistory = () => {
    $("#mesajAlani").html("");
}

export const clearHistoryFromDb = () => {
    var query = database.ref("chats");
    query.remove();
}

export const setOnline = (userName: string, isOnline: number) => {
    database.ref("users/" + userName + "/online").set(isOnline);
}

export const addBlockedIp = (ip: string, userName: string) => {

    var key = database.ref("blockedusers/" + ip).push().key; //Rastgele bir userkey gönderir.
    database.ref("blockedusers/" + ip).set({
        ip: ip,
        key: key,
    });
    alert("User blocked");

    var query = database.ref("blockedusers");
    query.on('child_added', (snapshot: { val: () => any; }) => {
        var data = snapshot.val();
        if (data.ip === getGlobalUserInfo) {
            $("#mesaj").attr('disabled', 'disabled');
        }
    });
    var ref = database.ref("users/" + userName);
    ref.remove();
}



export const showUserOptions = (key: string) => {
    var user = getUserInfoFromStorage();
    if (user.userName === "Ahmet") {
        if ($("#options" + key).is(":hidden")) {
            $("#options" + key).show();
        } else {
            $("#options" + key).hide();
        }
    }
}

export const showMenu = () => {
    if ($("#action_menu").is(":hidden")) {
        $("#action_menu").show();
    } else {
        $("#action_menu").hide();
    }
}


export const getColor = () => {
    var myColors = [
        '#FF0000', '#800000', '#FFAF00', '#808000', '#00FF00', '#008000', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080'
    ];
    return myColors[Math.floor(Math.random() * myColors.length)];
}

export const showTimeOfMessage = (key: string) => {
    if ($("#timeOfMessage" + key).is(":hidden")) {
        $("#timeOfMessage" + key).show();
    } else {
        $("#timeOfMessage" + key).hide();
    }
}

export const formatTime = (date: string | number | Date) => {

    let d = new Date(date);

    var h: any = d.getHours(), m = d.getMinutes(), l = "AM";
    if (h > 12) {
        h = h - 12;
    }
    if (h < 10) {
        h = '0' + h;
    }

    if (d.getHours() >= 12) {
        l = "PM"
    } else {
        l = "AM"
    }

    let mString = m < 10 ? '0' + m : m;
    return h + ':' + mString + ' ' + l;

}

export const getGlobalUserInfo = () => {
    $.ajaxSetup({
        async: false
    });
    var ip = "";
    $.getJSON("https://api.ipify.org?format=json", (data: { ip: string; }) => {
        ip = data.ip
    });
    $.ajaxSetup({
        async: true
    });
    return ip.split('.').join('');
}