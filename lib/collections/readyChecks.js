ReadyChecks = new Mongo.Collection('readyChecks');

Meteor.methods({
  userAccept: function(gameRoomId) {
    var user = Meteor.user();
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    if ( _.indexOf(readyCheck.accepted, user._id) === -1 && _.indexOf(readyCheck.idle, user._id) >= 0) {
      readyCheck.accepted.push(user._id);
    }
    readyCheck.idle = _.without(readyCheck.idle, user._id);

    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes});
  },

  userDecline: function(gameRoomId) {
    var user = Meteor.user();
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    if ( _.indexOf(readyCheck.declined, user._id) === -1 && _.indexOf(readyCheck.idle, user._id) >= 0) {
      readyCheck.declined.push(user._id);
    }
    readyCheck.idle = _.without(readyCheck.idle, user._id);

    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes});
  },

  purgeUserFromGameRoom: function(gameRoomId) {
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    var gameRoomUpdateAttributes = {}

    // Reset all user status to idle, and remove users who delined from game room
    readyCheck.idle = readyCheck.accepted;
    gameRoomUpdateAttributes.novelists = readyCheck.accepted;

    // Remove user from readyCheck
    readyCheck.accepted = []
    readyCheck.declined = []
    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");

    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes})
    GameRooms.update(gameRoomId, {$set: gameRoomUpdateAttributes});
  },

  readyCheckResult: function(gameRoomId) {
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});

    // if any user declined
    if (readyCheck.declined.length != 0) {
      // purge declined users and reset game room
      Meteor.call("purgeUserFromGameRoom", gameRoomId, function (error, result) {});
    } else {
      // begin game!
    }
  },

})