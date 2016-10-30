'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const List = require('./list')
const Task = require('./task')

module.exports = {List, Task}

Task.belongsTo(List);
//creates a listId on task table
//list has many tasks would also be acceptable
