'use strict'
const api = require('express').Router()
const db = require('APP/db')
// const Sequelize = require('sequelize');
const List = require('../db/models/list');
const Task = require('../db/models/task');

api.get('/hello', (req, res) => res.send({hello: 'world'}))


//-------------------**tasks**-------------------//

//create a task, update a task, delete a task?, could get a task by id

//get all tasks
api.get('/task', function(req, res, next) {
	Task.findAll()
	.then(arrOfTasks => res.send(arrOfTasks))
	.catch(next)
})

//get task by id
api.get('/task/:taskId', function(req, res, next) {
	Task.findById(req.params.taskId)
	.then(task => res.send(task))
	.catch(next)
})

api.post('/task', function(req, res, next) {
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
//for now only allows updating name or status in crude way
api.put('/task/:id', function(req, res, next) {
	if (req.body.name) {
		Task.update({
			name: req.body.name
		}, {
			where: {id: req.params.id}
			}
		)
		.then(updatedTask => res.send(updatedTask))
		.catch(next)
	}
	if (req.body.status) {
		Task.update({
			status: req.body.status
		}, {
			where: {id: req.params.id}
			}
		)
		.then(updatedTask => res.send(updatedTask))
		.catch(next)
	}
})

api.delete('/task/:id', function(req, res, next) {
	Task.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(res.send('successfully deleted'))
	.catch(next)
})

//-----------------**list**------------------//
//create a list, update a list, delete a list, get all lists (& all tasks)

api.get('/list', function(req, res, next) {
	List.findAll()
	.then(arrOfLists => res.send(arrOfLists))
	.catch(next)
})


//get all tasks for a list
api.get('/list/:listId', function(req, res, next) {
	Task.findAll({
		where: {
			listId: req.params.listId
		}
	})
	.then(arrOfTasks => res.send(arrOfTasks))
	.catch(next)
})

//may have issues with owner, privacy, or dateCreated since not all required
//and privacy and dateCreated have default values
api.post('/list', function(req, res, next) {
	List.create({
		name: req.body.name,
		owner: req.body.owner,
		privacy: req.body.privacy,
		dateCreated: req.body.dateCreated
	})
	.then(createdList => res.send(createdList))
	.catch(next)
})

//update list name or privacy -crude way --won't currently update 2 things at once
api.put('/list/:listId', function(req, res, next) {
	if (req.body.name) {
		List.update({
			name: req.body.name
		},
		{ where: {
				id: req.params.listId
			}
		})
		.then(updatedList => res.send(updatedList))
		.catch(next)
	}
	if (req.body.privacy) {
		List.update({
			privacy: req.body.privacy
		},
		{
			where: {
				id: req.params.id
			}
		})
		.then(updatedList => res.send(updatedList))
		.catch(next)
	}
})

api.delete('/list/:listId', function(req, res, next) {
	List.destroy({
		where: {
			id: req.params.listId
		}
	})
	.then(res.send('successfully deleted'))
	.catch(next)
})



module.exports = api