const request = require('request');

function CallWeb(access_token, api_name, data) {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.weixin.qq.com/tcb/${api_name}?access_token=${access_token}`,
            body: JSON.stringify(data),
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
    let { appid, name, data } = event;
    if (appid != null && name != null && data != null) {
        let access_token = await require('../getAuthToken/index')({
            appid
        });
        if (access_token != null) {
            let result = await CallWeb(access_token, name, data);
            try{
                let res = JSON.parse(result);
                console.log(res);
                return res;
            }
            catch(e){
                console.log(e,result);
                return result;
            }
        }
        else {
            return {
                code: -1,
                msg: 'access_token is null'
            }
        }
    }
    else {
        console.log(event);
        return 404;
    }
}

module.exports = main;