'use strict';

var mongoose = require('mongoose'),
  uuid = require('node-uuid'),
  Schema = mongoose.Schema;

var MyDashboardSchema = new Schema({
   _id: {type: String},
  dashboard:{type: String},
  sections: Schema.Types.Mixed
});

MyDashboardSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('MyDashboard', MyDashboardSchema);
