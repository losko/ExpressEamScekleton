const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8888
const dbpath = 'mongodb://localhost:27017/exam-server-db'

module.exports = {
	development: {
		port: port,
		dbpath: dbpath
	},
	production: {}
}