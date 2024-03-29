'use strict';
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

//TODO: We should add user GUID
var MessageSchema = new Schema({
  _id: { type: String },
  topic: {type: String},
  value: {type: String},
  key: { type: String},
  createdAt: { type: Date },
  expireAt: { type: Date }
}
//,{ capped: 1024 }
);

MessageSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });

MessageSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    if (this.createdAt === undefined) {
        this.createdAt = new Date();
    }

    next();
});

mongoose.model('Message', MessageSchema);
