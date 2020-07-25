const request = require('request');
const db = require('../database/lowdb');

//获取相关的第三方平台信息
const { component_appid, component_appsecret } = require('../key.json');

//封装的http请求函数
function CallWeb(ticket) {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.weixin.qq.com/cgi-bin/component/api_component_token',//请求的API地址
            body: JSON.stringify({
                component_appid,
                component_appsecret,
                component_verify_ticket: ticket
            }),//传递的所需参数
            method: 'POST'
        }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            resolve(response.body);
        });
    });
}

async function main(event){
    try {
        //由于令牌有一定时效性，所以我们没必要每一次都要请求，而是将令牌保存重复利用，我们将令牌保存在wxid集合中的component_access_token文档里
        
        //首先取出文档的信息
        let access_token = db.get_cat();

        //以当前时间的往后一分钟来作为上限时间
        let overtime = new Date((new Date()).valueOf() + 60 * 1000);

        //如果文档的令牌超时时间大于上限时间，则证明令牌还有效，直接返回令牌
        if (access_token.time > overtime) {
            return access_token.value;
        }
        else {
            //如果小于则证明令牌过期，需要重新申请
            console.log('token timeover!');
            try {
                //取出ticket票据信息
                let ticket = db.get_cvt();
                //将票据信息传入http请求函数，等待请求结果
                let result = await CallWeb(ticket.value);

                //结果是一个json字符串，验证是否有component_access_token字样，如果有则没有报错
                if (result.indexOf('component_access_token') != -1) {

                    //解析字符串为json
                    let { component_access_token, expires_in } = JSON.parse(result);
                    try {
                        //更新令牌，并设定超时时间为当前时间的有效时效后，expires_in为有效秒数
                        db.update_cat(component_access_token,expires_in);
                        //返回新的令牌
                        return component_access_token;
                    }
                    catch (e) {
                        console.log('access save failed！', e);
                        return null;
                    }
                }
                else {
                    console.log('wxcall failed！', result);
                    return result;
                }
            } catch (e) {
                console.log('ticket failed!', e);
                return null;
            }
        }
    }
    catch (e) {
        console.log('access get failed!', e);
        return null;
    }
}

module.exports = main;