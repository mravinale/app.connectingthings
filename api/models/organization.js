'use strict';

var mongoose = require('mongoose'),
    supergoose = require('supergoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: {type: String}
});


OrganizationSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

OrganizationSchema.plugin(supergoose);
mongoose.model('Organization', OrganizationSchema);
