const mongoose = require('mongoose')
const encryption = require('../util/encryption')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	hashedPass: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	salt: { type: String, required: true },
	roles: [{ type: String }]
})

userSchema.method({
	authenticate: function (password){
		return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
	}
})

const User = mongoose.model('User' ,userSchema)

module.exports = User
module.exports.seedAdminUser = async () => {
	try {
		let users = await User.find()
		if (users.length > 0) return
		const salt = encryption.generateSalt()
		const hashedPass = encryption.generateHashedPassword(salt, 'Admin')
		return User.create({
			username: 'Admin',
			salt,
			hashedPass,
			roles: ['Admin']
		})

	} catch (e) {
		console.log(e)
	}
}
