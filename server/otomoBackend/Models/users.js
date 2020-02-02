const db = require("../Configs/db");

module.exports = {
  register: (data, callBack) => {
    db.query(
      `INSERT INTO user(username,email,password)values (?,?,?)`,
      [data.username, data.email, data.password, data.address],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: callBack => {
    db.query(
      `select id_user,name,email,password,address from user`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  
  getUserbyEmail: (email, callBack) => {
    db.query(
      `select * from user where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
