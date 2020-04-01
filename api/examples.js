import request from '../utils/request';

// 获取合同列表信息
export async function contractList (data) {
    return request(`/data/contract/getList`, {
        method: 'post',
        data,
    });
}

// 添加+编辑合同
export async function contractAdd (data) {
    return request(`/data/contract/add`, {
        method: 'post',
        data,
        uiniqueRes: true,
    });
}

// 合同模板 - 操作日志
export async function getLogList (data) {
    return request(`/data/contract/getLogList`, {
        method: 'get',
        data,
        defaultVal: []      //如无返回信息 则使用的默认值 若不填 此值默认为 {}
    });
}