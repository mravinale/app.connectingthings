'use strict';

var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description:{ type: String },
  panels: [{ type:String, ref: 'Panel', required: true }],
  sections: [{ type:String, ref: 'Section', required: true }],
  owner: { type: String, ref: 'User' },
  organization: { type: String, ref: 'Organization' }
});

DashboardSchema.pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }

    next();
});

DashboardSchema.path('panels').validate(function(panels){
    if(!panels) return false;
    return panels.length !== 0;
}, 'Required at least one element');


mongoose.model('Dashboard', DashboardSchema);
