GameRooms = new Mongo.Collection('gameRooms');

Meteor.methods({
  createGameRoom: function(gameRoomProperties){
    var gameRoomPropertiesComplete = _.extend(gameRoomProperties, {
      gameOwner: Meteor.userId(),
      novelists: [Meteor.userId()],
    });
    var gameRoomId = GameRooms.insert(gameRoomPropertiesComplete);

    var readyCheckProperties = {
      gameRoomId: gameRoomId,
      idle: [Meteor.userId()],
      ready: [],
    }

    ReadyChecks.insert(readyCheckProperties);
  },

  joinGameRoom: function(userId, gameRoomId) {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    if(!_.contains(gameRoom.novelists, userId)){
      gameRoom.novelists.push(userId);
    }
    updateAttributes = _.omit(gameRoom, "_id");
    GameRooms.update(gameRoomId, {$set: updateAttributes});

    // Add user to ready check object when user join game
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    if ( _.indexOf(readyCheck.idle, userId) === -1) {
      readyCheck.idle.push(Meteor.userId());
    }
    readyCheckUpdateProperties = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateProperties});
  },

  leaveGameRoom: function(userId, gameRoomId) {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    if(_.contains(gameRoom.novelists, userId)){
      gameRoom.novelists = _.without(gameRoom.novelists, userId);
    }
    updateAttributes = _.omit(gameRoom, "_id");
    GameRooms.update(gameRoomId, {$set: updateAttributes});

    // Remove user from ready check object when user leaves game
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});
    readyCheck.idle = _.without(readyCheck.idle, userId)
    readyCheckUpdateProperties = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateProperties});
  },

  beginGameAndSetTimers: function(gameRoomProperties) {
    var gameRoom = GameRooms.findOne({_id: gameRoomProperties.gameRoomId});

    var phaseChangeSequence = {
      "Waiting for more players": "Writing",
      "Writing":                  "Voting",
      "Voting":                   "Writing"
    };

    var updateAttributes = {
      currentPhase: phaseChangeSequence[gameRoom.currentPhase],
      currentPhaseEndTime: moment().add(config.phaseLength, 'minutes'),
    };

    GameRooms.update(gameRoom._id, {$set: updateAttributes});
    // console.log(phaseChangeSequence[gameRoom.currentPhase]);
  },

});