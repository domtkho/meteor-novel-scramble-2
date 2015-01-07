GameRooms = new Mongo.Collection('gameRooms');

Meteor.methods({
  createGameRoom: function(gameRoomProperties){
    var gameRoomPropertiesComplete = _.extend(gameRoomProperties, {
      gameOwner: Meteor.userId(),
      novelists: [Meteor.userId()],
    });
    console.log(gameRoomPropertiesComplete);
    GameRooms.insert(gameRoomPropertiesComplete);
  },

  joinGameRoom: function(userId, gameRoomId) {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    if(!_.contains(gameRoom.novelists, userId)){
      gameRoom.novelists.push(userId);
    }
    updateAttributes = _.omit(gameRoom, "_id");
    GameRooms.update(gameRoomId, {$set: updateAttributes});
  },

  leaveGameRoom: function(userId, gameRoomId) {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    if(_.contains(gameRoom.novelists, userId)){
      gameRoom.novelists = _.without(gameRoom.novelists, userId);
    }
    updateAttributes = _.omit(gameRoom, "_id");
    GameRooms.update(gameRoomId, {$set: updateAttributes});
  },

  beginGameAndSetTimers: function(gameRoomProperties) {
    var gameRoom = GameRooms.findOne({_id: gameRoomProperties.gameRoomId});
    console.log(gameRoom);
  },

});