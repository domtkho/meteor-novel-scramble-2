Scripts = new Mongo.Collection('scripts');

Meteor.methods({
  createScriptSubmission: function(scriptProperties) {
    var user = Meteor.user();
    var gameRoom = GameRooms.findOne({_id: scriptProperties.gameRoomId});

    gameRoom.novelistsSubmittedForCurrentChapter.push(user._id);

    var gameRoomUpdateProperties = {};
    gameRoomUpdateProperties.novelistsSubmittedForCurrentChapter = gameRoom.novelistsSubmittedForCurrentChapter;

    var scriptPropertiesComplete = _.extend(scriptProperties, {
      userId: user._id,
      voters: [],
    });

    Scripts.insert(scriptPropertiesComplete);
    GameRooms.update(gameRoom._id, {$set: gameRoomUpdateProperties});

    // $('#script-paragraph').slideUp();
    // $('.help-block').fadeOut();
    // $('.submit-script-button').fadeOut();

  }
});