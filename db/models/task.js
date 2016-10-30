let Sequelize = require('sequelize');
let db = require('APP/db');

module.exports = db.define('task', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	dueDate: {
		type: Sequelize.DATEONLY
	},
	priority: {
		type: Sequelize.ENUM('normal', 'high'),
		defaultValue: 'normal'
	},
	status: {
		type: Sequelize.ENUM('incomplete', 'complete'),
		defaultValue: 'incomplete'
	}
})