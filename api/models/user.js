const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ // schema -> layout of design you wanna construct
    _id: mongoose.Schema.Types.ObjectId,       // long string type - internally
    email: { type: String , reqired:true,unique:true    // unique -> validation nahi krta -> only optimizes search, store,etc.
    ,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/   },
    password : {type: String, reqired: true}
});

//  mongoose.model('NameOfModel', itsSchema)
module.exports = mongoose.model('NodeAuthUser', userSchema); // similar to the constructor