const express = require ('express')

const User= require('./users')

const product = require('./Product')
const history = require('./history')
const article= require('./articles')

const Router = express.Router();

Router.use('/product', product)

Router.use('/user',User)

Router.use('/history',history)
Router.use('/article',article)



module.exports = Router // export Route