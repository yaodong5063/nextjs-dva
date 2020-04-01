"use strict";
const Url={
    COM:{
        API_HOST: '//gcrm.paat.com',
        FILE_HOST: 'https://fileserver.paat.com',
        USERS_HOST: '//users.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.com',  //https的webspcket配置
    },
    ORG:{
        API_HOST: '//gcrm.paat.org',
        USERS_HOST: '//users.paat.org',
        FILE_HOST: 'https://fileserver.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.org',  //https的webspcket配置
    },
    VIP:{
        API_HOST: '//gcrm.paat.vip',
        USERS_HOST: '//users.paat.vip',
        FILE_HOST: 'https://fileserver.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.vip',  //https的webspcket配置
    },
    LINK:{
        API_HOST: '//gcrm.paat.link',
        USERS_HOST: '//users.paat.link',
        FILE_HOST: 'https://fileserver.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.link',  //https的webspcket配置
    },
    TOP:{
        API_HOST: '//gcrm.paat.top',
        USERS_HOST: '//users.jieshui8.top',
        FILE_HOST: 'https://fileserver.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.top',  //https的webspcket配置
    },
    WORK:{
        API_HOST: '//gcrm.paat.work',
        USERS_HOST: '//users.paat.work',
        FILE_HOST: 'https://fileserver.paat.com',
        BANKTESTCOM: '//bank.paat.com',//充值前生成捷晶工厂所需的临时token-个人中心 com 环境 =>com  bank
        WS_HOST:'//gcrm.paat.work',  //https的webspcket配置
    }
}

const current_env = location.hostname
        .match("\\w+.\\w+.(\\w+)")[1]
        .toUpperCase();
let globalUrl={};
if (current_env === "ORG") {
    globalUrl=Url[current_env];
}else if (current_env === "LINK") {
    globalUrl=Url[current_env];
}else if (current_env === "WORK") {
    globalUrl=Url[current_env];
}else if (current_env === "TOP") {
    globalUrl=Url[current_env];
}else if (current_env === "VIP") {
    globalUrl=Url[current_env];
}else if (current_env === "COM") {
    globalUrl=Url[current_env];
}else{
    globalUrl=Url.LINK;
}

export default globalUrl;
