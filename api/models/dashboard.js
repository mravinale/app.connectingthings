'use strict';
//https://github.com/localytics/angular-chosen
var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  _id: { type: String },
  name: String,
  description: String,
  sections: [{ type:String, ref: 'Section' }],
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
});

DashboardSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Dashboard', DashboardSchema);
