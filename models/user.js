const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    image: String,
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
});

// Para obtener por defecto el username y password
UserSchema.plugin(passportLocalMongoose);

/* User:
- email - string
- password - string
- username - string
- image - string
- posts - array of objects ref Post
 */

module.exports = mongoose.model('User', UserSchema);
