ReadyChecks = new Mongo.Collection('readyChecks');

Meteor.methods({
  userAccept: function(gameRoomId) {
    var user = Meteor.user();
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    readyCheck.idle = _.without(readyCheck.idle, user._id);
    readyCheck.ready.push(user._id);

    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes})
  },

  userDecline: function(gameRoomId) {
    var user = Meteor.user();

    // If user decline, ready check object will be reset
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    readyCheck.idle = _.without(_.union(readyCheck.idle, readyCheck.ready), user._id);
    readyCheck.ready = []
    var readyCheckUpdateAttributes = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateAttributes})

    // user will also be removed from the game room novelist list
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    var gameRoomUpdateAttributes = {}
    gameRoomUpdateAttributes.novelists = _.without(gameRoom.novelists, user._id);
    GameRooms.update(gameRoomId, {$set: gameRoomUpdateAttributes});
  },


})