const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const User = require('../models/User')

module.exports = config => {
	mongoose.connect(config.dbpath, {
		useMongoClient: true
	})
	const db = mongoose.connection
	db.once('open', err => {
		if (err) throw err
		User.seedAdminUser().then(() => {
			console.log('DB Ready!')
		}).catch((reason) => {
			console.log(reason)
		})
	})
	db.on('error', reason => {
		console.log(reason)
	})
}