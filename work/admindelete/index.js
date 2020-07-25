const db = require('../database/lowdb');

function main(event){
    if(event.id!=null){
        return db.delete_mini(event.id);
    }
    else{
        return null;
    }
}

module.exports = main;