GameRooms = new Mongo.Collection('gameRooms');

Meteor.methods({
  createGameRoom: function(gameRoomProperties){
    var gameRoomPropertiesComplete = _.extend(gameRoomProperties, {
      gameOwner: Meteor.userId(),
      novelists: [Meteor.userId()],
      currentChapter: 1,
    });
    var gameRoomId = GameRooms.insert(gameRoomPropertiesComplete);

    var readyCheckProperties = {
      gameRoomId: gameRoomId,
      idle: [Meteor.userId()],
      accepted: [],
      declined: [],
    };

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
    readyCheck.idle = _.without(readyCheck.idle, userId);
    readyCheckUpdateProperties = _.omit(readyCheck, "_id");
    ReadyChecks.update(readyCheck._id, {$set: readyCheckUpdateProperties});
  },

  beginGameAndSetTimers: function(gameRoomId) {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});

    var updateAttributes = {
      currentPhase: "Writing",
      currentPhaseEndTime: moment().add(config.phaseLength, 'minutes'),
    };
    GameRooms.update(gameRoomId, {$set: updateAttributes});
  },

  switchPhaseAndSetTimers: function(gameRoomId) {
    var phaseChangeSequence = {
      "Writing":    "Voting",
      "Voting":     "Writing",
      "Game Ended": "Game Ended",
    };

    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    var updateAttributes = {};

    updateAttributes.currentPhase = phaseChangeSequence[gameRoom.currentPhase];
    updateAttributes.currentPhaseEndTime = moment().add(config.phaseLength, 'minutes');

    // Check end game conditions
    if (updateAttributes.currentPhase === "Writing"){
      if (gameRoom.currentChapter >= gameRoom.numberOfChapters) {
        updateAttributes.currentPhase = "Game Ended";
      } else {
        updateAttributes.currentChapter = gameRoom.currentChapter + 1;
      }
    }
    GameRooms.update(gameRoomId, {$set: updateAttributes});
  },

});