ReadyChecks = new Mongo.Collection('readyChecks');

Meteor.methods({
  userIsReady: function(gameRoomId) {
    var user = Meteor.user();
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    readyCheck.idle = _.without(readyCheck.idle, user._id);
    readyCheck.ready.push(user._id);

    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes})
  },

  userIsNotReady: function(gameRoomId) {
    var user = Meteor.user();
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    readyCheck.idle = _.union(readyCheck.idle, readyCheck.ready);
    readyCheck.ready = []

    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes})
  },


})