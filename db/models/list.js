'use strict';
var Sequelize = require('sequelize')
var db = require('APP/db')

module.exports = db.define('list', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false,
  	validate: {
  		notEmpty: true
  	}
  	//do i need to check for unique to make sure no duplicate names??
  },
  owner: {
  	type: Sequelize.STRING
  },
  privacy: {
  	type: Sequelize.ENUM('private', 'public'),
  	defaultValue: 'public'
  },
  dateCreated: {
  	type: Sequelize.DATE,
  	defaultValue: Date.now()
  }
  //length or numbers of tasks associated

},

//options object
{
	// getterMethods: {
	// 	setDate: function(dateCreated) {

	// 	}
	// }


})
