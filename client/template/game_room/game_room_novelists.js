Template.gameRoomNovelists.helpers({
  novelists: function () {
    var availableSlots = this.numberOfPlayers - this.novelists.length;
    dummyArray = this.novelists;
    for (var i = 0; i < availableSlots; i++) {
      dummyArray.push(null);
    }
    return dummyArray;
  },

  novelistName: function(novelistId) {
    return Meteor.users.findOne({_id: novelistId}).profile.name;
  },

  novelistProfilePicture: function(novelistId) {
    var facebookId = Meteor.users.findOne({_id: novelistId}).services.facebook.id;
    return "http://graph.facebook.com/" + facebookId + "/picture/?type=square";
  },

  isCurrentUser: function(userId) {
    return userId === Meteor.userId();
  },

  shouldDisplaySubmissionStatus : function () {
    var gameRoom = GameRooms.findOne({_id: Session.get("currentGameRoomId")});
    return gameRoom.currentPhase !== "Waiting for more players";
  },

  hasSubmittedScript: function(userId) {
    var gameRoom = GameRooms.findOne({_id: Session.get("currentGameRoomId")});
    return _.indexOf(gameRoom.novelistsSubmittedForCurrentChapter, userId) < 0 ? false : true;
  },
});