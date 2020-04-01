import moment from 'moment';
import { resolve } from 'path';
import { filePath } from './setting';

//手机号码正则
export function isMobile (val) {
    return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(val);
};

//身份证正则
export function isIdentityCard(val) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(val);
}

// 统一社会信用代码正则
export function isCode(val) {
    return /[\dABCDEFGHJKLMNPQRTUWXYa-z]{18}$/g.test(val);
}
//邮箱正则
export function isEmail (val) {
    return /\w+@[a-z0-9]+\.[a-z]{2,4}/.test(val);
};

//中英文数字正则
export function isUserName (val) {
    return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])*$/.test(val);
};

//密码长度至少8位，最多16位，必须包含英文大小写和数字
var isPassTypeOk = function (val) {
    // return /^(?![a-z]+$)(?![A-Z]+$)(?!\d+$)[a-zA-Z\d]{8,16}$/.test(val);
    return /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,16}$/.test(val);
};

//手机号验证
export function mobileValidator (rule, value, call) {
    if (!value) {
        call();
        return;
    }
    if (isMobile(value)) {
        call();
    } else {
        call(new Error());
    }
}

//邮箱验证
export function emailValidator (rule, value, call) {
    if (!value) {
        call();
        return;
    }
    if (isEmail(value)) {
        call();
    } else {
        call(new Error());
    }
}

//支持中英文数字输入，限制字数20个字以内
export function userNameValidator (rule, value, call) {
    if (!value) call();
    if (isUserName(value)) {
        call();
    } else {
        call(new Error());
    }
}

//密码长度至少8位，最多16位，必须包含英文大小写和数字
export function userPassValidator (rule, value, call) {
    if (!value) call();
    if (isPassTypeOk(value)) {
        call();
    } else {
        call(new Error());
    }
}

//英文数字正则
export function isLettersAndNumbers (val) {
    return /^([a-zA-Z0-9_])*$/.test(val);
};

//支持英文数字输入
export function lettersAndNumbersValidator (rule, value, call) {
    if (!value) call();
    if (isLettersAndNumbers(value)) {
        call();
    } else {
        call(new Error());
    }
}

function uzStorage () {
    return window.localStorage;
}

export function setStorage (key, value) {
    if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        } else {
            v = 'str-' + v;
        }
        var ls = uzStorage();
        if (ls) {
            ls.setItem(key, v);
        }
    }
};

export function getStorage (key) {
    var ls = uzStorage();
    if (ls) {
        var v = ls.getItem(key);
        if (!v) {
            return;
        }
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};

export function rmStorage (key) {
    var ls = uzStorage();
    if (ls && key) {
        ls.removeItem(key);
    }
};

export function clearStorage () {
    var ls = uzStorage();
    if (ls) {
        ls.clear();
    }
};

//根据 年月日时分秒毫秒的数字 返回标准moment格式
export function getDayTime (time) {
    var days = parseInt(time / (1000 * 60 * 60 * 24));
     var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = (time % (1000 * 60)) / 1000;
     return days + "天" + hours + "时" + minutes + "分钟";
}

//根据 年月日时分秒毫秒的数字 返回标准moment格式
export function getMoment (time) {
    time = time.toString();
    return moment([time.substr(0, 4), Number(time.substr(4, 2)) - 1, time.substr(6, 2), time.substr(8, 2), time.substr(10, 2), time.substr(12, 2), time.substr(14, 3)])
}

//根据 年月日的字符串 返回标准moment格式
export function getMomentFromYMD (time) {
    time = time.toString();
    return moment([time.substr(0, 4), Number(time.substr(5, 2)) - 1, time.substr(8, 2)])
}

export function getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

//转换为千分位 s 数字， t true false, n 保留小数点后几位
export function numberToFMT (s, t, n) {
    var num = s;
    if (isNaN(num)) {
        return "0";
    }
    var num = num.toString();
    if (t) {
        var c_d = num.split(".");
        var re = /(?=(?!(\b))(\d{3})+$)/g;
        var dec = c_d[0].replace(re, ",");
        if (c_d.length > 1) {
            dec += '.' + c_d[1];
        }
        num = dec;
    }
    if (n) {
        var pos_decimal = num.indexOf(".");
        if (pos_decimal < 0) {
            //无小数点 补点
            pos_decimal = num.length;
            num += ".";
        }
        if (num.length - pos_decimal > n + 1) {
            num = num.substring(0, pos_decimal + n + 1);
        } else {
            while (num.length <= pos_decimal + n) {
                num += 0;
            }
        }
    }
    return num;
}

export function formatJson (str) {
    var json = {};
    try {
        json = JSON.parse(str);
    } catch (e) { };
    return json;
}

//最多保留小数点后几位 如小数点无位
export function floatNumberFormat (val, dec) {
    if (!val) return;
    let pow = 10 ** 2;
    return parseInt(Number(val) * pow) / pow;
}

//显示文件大小
export function formatFileSize (size) {
    if (!size || size < 0) return '';
    size = Number(size);
    let m = 0;
    let kb = size / 1024;
    if (kb >= 1024) {
        m = kb / 1024;
    };
    if (m) return floatNumberFormat(m, 2) + 'M';
    return floatNumberFormat(kb, 2) + 'K';
}

//生成唯一ID
export function getUniqueId () {
    let time = new Date().getTime(),
        random = 100 * Math.random();
    return time + random;
}

/**
 * 根据日期数字显示为 标准日期 - 
 * @param {Number} date 日期数字
 */
export function getDeteFromNums (date) {
    if (!date) return '';
    let dtStr = String(date);
    return dtStr.substr(0, 4) + '-' + dtStr.substr(4, 2) + '-' + dtStr.substr(6, 2);
}

/**
 * 根据URL截取需要的值
 * @param {Number} type 1 名称 2格式
 */
export function getUploadedName (url, type) {
    // console.log(url,type,1);
    if (!url) return '';
    let urlArr = url.split('/');
    let name = urlArr[urlArr.length - 1].split('.');
    // console.log(name,1);
    return type === 1 ? name[0] : name.length > 1 && name[1] || '';
}

export function enterBreak (v) {
    if (!v) return '';
    v = v.replace(/\n/g, '<br/>');
    return v;
}

/**
 * 返回权限字典表 array
 */
export function returnAuthMenuList (data) {
    if (!data || !data.length) return [];
    const urls = [];
    const mapData = (d) => {
        d.forEach(item => {
            if (item.url) {
                urls.push(item.url);
            };
            if (item.children) {
                mapData(item.children);
            }
        })
    }
    mapData(data);
    return urls;
}

export function copyText(str){
    let oInput = document.createElement('input')
    oInput.value = str
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand("Copy")
    oInput.style.display = 'none'
    document.body.removeChild(oInput)
}

/**函数节流**/
export const throttle = {
    isThrottle: true,
    throttle (callback) {
        if (this.isThrottle) {
            this.isThrottle = false;
            return new Promise((resolve, reject) => {
                if (typeof callback === 'function') {
                    callback(resolve)
                } else {
                    resolve(true)
                }
            }).finally(resolve => {
                this.isThrottle = true;
            })
        } else {
            return;
        }
    }
};

/**公共码表函数**/
export function codeCommon (dispatch, date, code, fname = 'getCodeCommon') {
    return new Promise((resolve, reject) => {
        if (!date) {
            dispatch({
                type: `common/${fname}`,
                code: code,
            })
            .then(res => resolve(res.data));
        } else {
            resolve(date)
        }
    })
};

/**返回当前年月日 **/
export const timeYMD=()=>{
    const y=new Date().getFullYear();
    let m=new Date().getMonth()+1;
    let d=new Date().getDate();
    let h=new Date().getHours();
    let m1=new Date().getMinutes();
    let s=new Date().getSeconds();
    m=m<10?`0${m}`:m;
    d=d<10?`0${d}`:d;
    h=h<10?`0${h}`:h;
    m1=m1<10?`0${m1}`:m1;
    s=s<10?`0${s}`:s;
    return { y,m,d,h,m1,s}
}

//组织架构结构
export const treeStructure=(date)=>{
     function treeDate(d){
        d.map((e,i)=>{
            e.title=e.departmentName||e.employeeName;
            if(!e.id){
               e.key=JSON.stringify(e);
               e.logo='department'
               e.value=e.departmentName+e.departmentId;
            }else{
                e.logo='people';
                e.key=JSON.stringify(e);
                e.value=e.id;
            }
            
            
            if(e.tenantEmployeeList&&e.tenantEmployeeList.length || e.childTenantDepartmentList&&e.childTenantDepartmentList.length){
                e.children=[...e.tenantEmployeeList,...e.childTenantDepartmentList];
                delete e.tenantEmployeeList;
                delete e.childTenantDepartmentList;
            }

            if(e.children&&e.children.length){
                treeDate(e.children)
            }
         });
     }
     date&&treeDate(date);
     
     return date;
     
}

//二进制流解析
export function downloadFile(data){
    if (!data) {
      return
    }
    let url = window.URL.createObjectURL((new Blob([data], 
    { type: 'application/vnd.ms-excel;charset=utf-8' })))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', getUniqueId()+'.xls')
    document.body.appendChild(link)
    link.click()
};
/**
 * 上传后实时返回图片全路径
 * @param {object} item 包含fileId 和 fileFormat的对象
 */
export function getImageSource (item) {
    if(!item || !item.fileId) return '';
    const uri = filePath + item.fileId.substring(0, 3) + "/" + item.fileId + "." + (item.extName || item.fileType);
    return uri;
}

export function parseURL(url){
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        paramsUrl: (function() {
			var ret = {};
			var seg = a.search.replace(/^\?/, '').split('&').filter(function(v,i){
				if (v!==''&&v.indexOf('=')) {
					return true;
				}
			});
			seg.forEach( function(element, index) {
				var idx = element.indexOf('=');
				var key = element.substring(0, idx);
				var val = element.substring(idx+1);
				ret[key] = val;
			});
			return ret;
		})()
    };
}

export function pricePrent(price=0){
    //计算万分位和亿分位
    let priceY=100000000,
        priceW=10000; 
    if(!price) return price;    
    if(price/priceY>=1){
        let priceR=Math.round((price/priceY) * 100) / 100;
        return priceR+'亿';
    }else if(price/priceY<1 && price/priceW>=1){
        let priceR=Math.round((price/priceW) * 100) / 100;
        return priceR+'W';
    }else{
        return Math.round((price) * 1000000) / 1000000;;
    }    

}
export function wsCommon(obj){
    return new Promise((resolve, reject) => {
        const {wsData,dispatch}=obj;
        if (!!wsData) {
            resolve(wsData)
            dispatch({
                type: `common/removeGetWsData`
            })
            
        }
    })
}

export function treeSplice(arr=[]){
     let at=[];
     for(let k in arr){
         if(arr[k].indexOf('_')==-1){
            at.push(arr[k])
         }
     }
     return at;
}