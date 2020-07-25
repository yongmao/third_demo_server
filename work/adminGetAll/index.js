const db = require('../database/lowdb');

function main(event){
    return db.get_mini(null);
}

module.exports = main;