'use strict';

class dbHelper {
  constructor(modelName) {
    this.model = require('../models/' + modelName);
  }  

  findById (id) {
    return this.model.findOne({
      _id : id
    }).lean().exec();
  }
 
  findOne (params) {
    return this.model.findOne(params).lean().exec();
  }
 
  findAll (params) {
    return this.model.find(params).lean().exec();
  }
 
  save (obj) {
    const entity = new this.model(obj);
    return entity.save();
  }
 
  update (id, updateParams) {
     return this.model.findByIdAndUpdate(id, updateParams, { new: false, useFindAndModify: false }).exec();
  }

  softDelete (id) {
     return this.model.findByIdAndUpdate(id, { 'isDeleted': true }, { new: true }).exec();
  }

  findAndModify(query, updateParams, upsert = false) {
    return this.model.findOneAndUpdate(query, updateParams, { new: true, upsert: upsert }).exec();
  }
}

module.exports = dbHelper;