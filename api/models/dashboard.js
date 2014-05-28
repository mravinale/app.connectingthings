'use strict';

var mongoose = require('mongoose'),
  uuid = require('node-uuid'),
  Schema = mongoose.Schema;

var DashboardSchema = new Schema({
   _id: {type: String},
  order: Schema.Types.Mixed
});

DashboardSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

mongoose.model('Dashboard', DashboardSchema);
