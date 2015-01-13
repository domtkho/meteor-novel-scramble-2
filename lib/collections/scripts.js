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
      voteCount: 0,
    });

    Scripts.insert(scriptPropertiesComplete);
    GameRooms.update(gameRoom._id, {$set: gameRoomUpdateProperties});
  },

  scriptUpvote: function(scriptChosen) {
    var gameRoom = GameRooms.findOne({_id: scriptChosen.gameRoomId});
    var script = scriptChosen;

    // if user has not voted in current round...
    if (_.indexOf(gameRoom.usersVotedForCurrentChapter, Meteor.userId()) < 0) {
      gameRoom.usersVotedForCurrentChapter.push( Meteor.userId() );

      // 1. push current user id into currentroom's usersVotedForCurrentChapter array
      gameRoomUpdateProperties = {};
      gameRoomUpdateProperties.usersVotedForCurrentChapter = gameRoom.usersVotedForCurrentChapter;
      GameRooms.update(gameRoom._id, {$set: gameRoomUpdateProperties});

      // 2. update script's to voters to keep track of who has voted for this script
      if (_.indexOf(script.voters, Meteor.userId()) < 0){
        script.voters.push(Meteor.userId());
      }
      scriptUpdateProperties = {};
      scriptUpdateProperties.voters = script.voters;
      scriptUpdateProperties.voteCount = script.voters.length;
      Scripts.update(script._id, {$set: scriptUpdateProperties});
    }
  },
});