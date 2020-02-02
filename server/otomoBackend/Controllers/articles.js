const Model = require("../Models/articles");
const form = require("../Helpers/resForm");

module.exports = {
  getArticles: (req, res) => {
    Model.getArticles()
      .then(status1 => form.getArticles(res, status1, 200))
      .catch(error => console.log(error));
  }

}


