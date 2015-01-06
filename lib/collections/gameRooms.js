GameRooms = new Mongo.Collection('gameRooms');

Meteor.methods({
  createGameRoom: function(gameRoomProperties){

    var gameRoomPropertiesComplete = _.extend(gameRoomProperties, {
      gameOwner: Meteor.userId(),
      novelists: [Meteor.userId()],
    });
    console.log(gameRoomPropertiesComplete);
    GameRooms.insert(gameRoomPropertiesComplete);
  }
});