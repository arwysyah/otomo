const db = require('../Configs/db');

module.exports = {
    getArticles : ()=> { 
        return new Promise((resolve,reject)=>{
            db.query('SELECT * from article ',(error, status1)=>{
                if (!error)
                    resolve(status1,200)
                 else
                   reject(error)
                });
        })
    },
}