import fetch from 'dva/fetch';
import { stringify } from 'qs';
import globalUrl from './pro.js';

// console.log(hostDomain)

const host = window.location.host;

//判断是否为本地模式
export const isLocal = host.indexOf('localhost') >= 0;

//本地模式 设置代理头
export const httpHost = isLocal ? '/API_HOST_LINK' : '/api';

// 上传图片路径
export const uploadAction = 'https://fileserver.paat.com/file/upload/';
export const uploadImageAction = 'https://fileserver.paat.com/file/uploadimg/';      //(hostDomain === 'com' ? 'com' : 'vip')
export const filePath = 'https://fileserver.paat.com/';