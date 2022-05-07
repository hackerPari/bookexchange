'use strict';

const ObjectId = require('mongoose').Types.ObjectId;
const dbHelper = require('./baseDBHelper');

class UserHelper extends dbHelper {
  constructor () {
    super('user');
  }

  findUserById (id) {
    return this.model.findOne({
      _id : id,
      enabled: true
    }).lean().exec();    
  }

  saveSubjects (userid, subjects) {
    return this.model.updateOne({
      _id: ObjectId(userid)
    }, {$set: {
      'appData.subjects': subjects
    }}).exec()
  }

  updatePassword (userid, salt, password) {
    return this.model.updateOne({
      _id: ObjectId(userid)
    }, {
      $set: {
        salt,
        password
      }
    })
  }

  updateUserProfile (userid, query) {
    return this.model.updateOne({
      _id: ObjectId(userid)
    }, query).exec();
  }

  getUserByEmail(email) {
    return this.model.find({email}).exec();
  }

  getUserByMobileEmail(contact) {
    let query = {};
    if (contact) {
      query['appData.mobileNumber'] = contact;
      query['appData.mobileVerified'] = true;
    }
    return this.model.findOne(query).exec();
  }

  userClassMates (user) {
    return this.model.find({
      _id: {$nin: user._id},
      'student.school': user.student.school,
      'student.grade': user.student.grade
    }).exec();
  }

  getAppUserCount () {
    return this.model.countDocuments({ isAppUser: true }).exec();
  }

  updateAppLogin (_id, agent = '') {
    return this.model.updateOne({
      _id
    }, {$set: {
      loggedInApp: true,
      'appData.userAgent': agent,
      'appData.loggedInAt': new Date()
    }}).exec();
  }

  sameClassUsers (user, ids) {
    return this.model.find({
      'student.school': user.student.school,
      'student.grade': user.student.grade,
      _id: {$nin: ids}
    }).select('_id name student profileImage').populate('student.school', 'name').exec();
  }  

  suggestFromSchools (uids, sids, grade) {
    return this.model.find({
      _id: {$nin: ids},
      'student.school': {$in: sids},
      'student.grade': grade
    }).select('_id name student profileImage').populate('student.school', 'name').exec();
  }

  getTokens(uids) {
    return this.model.find({
      _id: {$in: uids}
    }).select('_id name firebaseToken').exec();
  }

  searchClassmates (user, search) {
    return this.model.find({
      _id: {$nin: [user._id]},
      name: new RegExp(search, 'i'),
      'student.grade': user.student.grade,
      'student.school': user.student.school
    }).select('_id name profileImage').exec();
  }

  saveEmail(id, email) {
    return this.model.updateOne({
      _id: ObjectId(id)
    }, {
      $set: {
        'appData.email': userProfileHelper.encryptContact(email),
        'appData.emailVerified': true
      }
    }).exec();
  }

  checkUserExists (query) {
    return this.model.countDocuments(query).exec();
  }

  updateContact (id, query) {
    return this.model.updateOne({_id: ObjectId(id)}, {$set: query}).exec();
  }

  updateRefCode (id, code) {
    return this.model.updateOne({_id: ObjectId(id)}, {$set: {'appData.refCode': code, 'appData.refCodeUpdatedAt': new Date()}}).exec();
  }

  checkCodeExists (id, code) {
    return this.model.countDocuments({_id: {$ne: id}, 'appData.userCode': code}).exec();
  }

  checkGVAssigned (code) {
    return this.model.countDocuments({'appData.giftVoucher': code}).exec();
  }

  updateGV (id, code) {
    return this.model.updateOne({_id: ObjectId(id)}, {$set: {'appData.giftVoucher': code}}).exec();
  }

  userByIds (ids) {
    return this.model.find({_id: {$in: ids}}).select('_id lastForumNotified firebaseToken').exec();
  }

  updateLastNotified (ids) {
    return this.model.updateMany({_id: {$in: ids}}, {$set: {lastForumNotified: Date.now()}}).exec();
  }

  updateWeeklyReward (user, weekNum) {
    return this.model.updateOne({_id: ObjectId(user)}, {$set: {'appData.weekNum': weekNum}}).exec();
  }

  updateUserLastLogin (user, ipAddr) {
    return this.model.updateOne({_id: ObjectId(user)}, {$set: {'appData.lastLogin': new Date(), 'appData.lastIP': ipAddr}}).exec();
  }

  getStudentByGradeSectionSubject(schoolID, year, board, grade, sections, subject) {
    return this.model.find({
      'role': 'student',
      'student.school': schoolID,
      'student.academicYear': year,
      'student.board': board,
      'student.grade': grade,
      'student.sectionInfo.section': {$in: sections},
      'student.sectionInfo.subjects': subject,
      enabled: true
    }).lean().exec();
  }
}

const userHelper = new UserHelper();
Object.freeze(userHelper);

module.exports = userHelper;