const db = require('../database/lowdb');

function main(event){
    if(event.id!=null){
        return db.get_lowmini(event.id);
    }
    else{
        return null;
    }
}

module.exports = main;