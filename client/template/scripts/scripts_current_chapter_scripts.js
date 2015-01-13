Template.scriptsCurrentChapterScripts.helpers({
  allScriptsForThisChapter: function () {
    if (this.currentPhase === "Voting") {
      return Scripts.find({gameRoomId: this._id, chapter: this.currentChapter});
    }
  },

  userHasNotVoted: function () {
    var gameRoom = GameRooms.findOne({_id: this.gameRoomId});
    return _.indexOf(gameRoom.usersVotedForCurrentChapter, Meteor.userId()) < 0 ? true : false;
  },

  scriptUserVotedOn: function () {
    return _.indexOf(this.voters, Meteor.userId()) < 0 ? false : true;
  },

  percentageVoteOnCurrentScript: function () {
    var totalVotes = GameRooms.findOne({_id: this.gameRoomId}).usersVotedForCurrentChapter.length;
    return Math.round(this.voteCount / totalVotes * 10)/10 * 100 || 0;
  },
});

Template.scriptsCurrentChapterScripts.events({
  'click .script-upvote': function () {
    Meteor.call('scriptUpvote', this, function (error, result) {});
  },

  'click .cancel-vote': function () {
    Meteor.call('cancelVote', this, function (error, result) {});
  },
});