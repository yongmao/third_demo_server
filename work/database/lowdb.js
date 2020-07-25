const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter_wxid = new FileSync('work/database/db_wxid.json');
const adapter_mini = new FileSync('work/database/db_mini.json');
const db_wxid = low(adapter_wxid);
const db_mini = low(adapter_mini);

db_wxid.defaults({
    component_verify_ticket: {
        time: new Date(),
        value: ''
    },
    component_access_token: {
        time: new Date(),
        value: ''
    }
}).write();

db_mini.defaults({

}).write();

function update_cvt(ticket, ext_time) {
    let res = db_wxid.set('component_verify_ticket', {
        time: new Date(new Date().getTime() + 1000 * ext_time),
        value: ticket
    }).write();
    console.log(res);
    return 0;
}

function update_cat(ticket, ext_time) {
    let res = db_wxid.set('component_access_token', {
        time: new Date(new Date().getTime() + 1000 * ext_time),
        value: ticket
    }).write();
    console.log(res);
    return 0;
}

function get_cvt(){
    return db_wxid.get('component_verify_ticket').value();
}

function get_cat(){
    return db_wxid.get('component_access_token').value();
}

function update_mini(id, obj) {
    if (id != null && db_mini.has(id).value()) {
        db_mini.get(id).assign(obj).write();
    }
    else {
        let uuid = getuuid();
        obj.uuid = uuid;
        db_mini.set(uuid,obj).write();
        id = uuid;
    }
    return {
        id:id,
        msg:0
    }
}

function get_mini(id){
    if (id != null && db_mini.has(id).value()) {
        return db_mini.get(id).value();
    }
    else{
        return db_mini.value();
    }
}

function query_mini(id){
    if (id != null && db_mini.filter({appid: id}).value()) {
        return db_mini.filter({appid: id}).value();
    }
    else{
        return false;
    }
}

function get_lowmini(id){
    if (id != null && db_mini.has(id).value()) {
        let res = db_mini.get(id).value();
        return {
            url:res.url,
            status:res.status
        }
    }
    else{
        return null;
    }
}

function delete_mini(id){
    if (id != null && db_mini.has(id).value()) {
        return db_mini.unset(id).write();
    }
    else{
        return false;
    }
}

function getuuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

module.exports = {
    update_cat,
    update_cvt,
    update_mini,
    get_cat,
    get_cvt,
    get_mini,
    delete_mini,
    get_lowmini,
    query_mini
}