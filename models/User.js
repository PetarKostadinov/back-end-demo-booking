const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    value: { type: String, enum: ['user', 'admin'] }
})


const userSchema = new Schema({
    username: { type: String, minlength: [3, 'Username must be at least 3 characters long' ]},
    hashedPassword: { type: String, required: true },
    roles: { type: [roleSchema], default: ['user'] }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;