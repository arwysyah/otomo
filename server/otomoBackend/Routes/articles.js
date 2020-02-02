const express = require ('express');
const Router = express.Router() // manggil router
const articleController = require ('../Controllers/articles');


Router.get('/',articleController.getArticles);




module.exports = Router
