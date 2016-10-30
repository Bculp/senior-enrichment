'use strict'
const api = require('express').Router()
const db = require('APP/db')
// const Sequelize = require('sequelize');
const List = require('../db/models/list');
const Task = require('../db/models/task');

api.get('/hello', (req, res) => res.send({hello: 'world'}))


//**setup crud routes for list and task models**//

//tasks
/*
create a task, update a task, delete a task?, could get a task by id
*/
api.get('/tasks:id', function(req, res, next) {
	Task.findById(req.params.id)
	.then(task => res.send(task))
	.catch(next)
})

api.post('/tasks', function(req, res, next) {
	//check for dueDate and create if exists, otherwise leave alone
	console.log('req.body', req.body)
	Task.create({
		name: req.body.name,
		dueDate: req.body.dueDate || "2100-1-1",
		priority: req.body.priority || 'normal',
		status: req.body.status || 'incomplete'
	})
	.then(createdTask => res.send(createdTask))
	.catch(next)
})

//update name, dueDate, priority, or status
//for now only allows updating name or priority in crude way
api.put('/tasks/:id', function(req, res, next) {
	if (req.body.name) {
		Task.update({
			where: {
				id: req.params.id
			},
			name: req.body.name
		})
		.then(updatedTask => res.send(updatedTask))
		.catch(next)
	}
	if (req.body.priority) {
		Task.update({
			where: {
				id: req.params.id
			},
			priority: req.body.priority
		})
		.then(updatedTask => res.send(updatedTask))
		.catch(next)
	}
})

api.delete('/tasks/:id', function(req, res, next) {
	Task.destroy({
		where: {
			id: req.params.id
		}
	})
	.catch(next)
})

//list
//create a list, update a list, delete a list, get all lists (& all tasks)

module.exports = api