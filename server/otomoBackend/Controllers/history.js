const Model = require("../Models/history");
const form = require("../Helpers/resForm");


module.exports = {
  getHistory: (req, res) => {
  
    Model.getHistory()
      .then(results => form.getHistory(res, results, 200))
      .catch(error => console.log(error));
  },
  postHistory: (req, res) => {
    //  const bodyReq = req.body;
    
    const body = {
      ...req.body
    };
    // console.log(body)
    Model.postHistory(body)
      .then(results => form.postHistory(res, results, 200))
      .catch(error => console.log(error));
  }
};
