Template.gameRoomReadyCheck.helpers({

  novelists: function () {
    var readyCheck = ReadyChecks.findOne({gameRoomId: this._id});
    Session.set("currentGameRoomId", this._id);
    return _.union(readyCheck.idle, readyCheck.accepted, readyCheck.declined);
  },

  novelistAccepted: function(novelistId) {
    var readyCheck = ReadyChecks.findOne({gameRoomId: Session.get("currentGameRoomId")});
    return (_.indexOf(readyCheck.accepted, novelistId) >= 0);
  },

  novelistDeclined: function(novelistId) {
    var readyCheck = ReadyChecks.findOne({gameRoomId: Session.get("currentGameRoomId")});
    return (_.indexOf(readyCheck.declined, novelistId) >= 0);
  },

  novelistName: function(novelistId) {
    return Meteor.users.findOne({_id: novelistId}).profile.name;
  },

  novelistProfilePicture: function(novelistId) {
    var facebookId = Meteor.users.findOne({_id: novelistId}).services.facebook.id;
    return "http://graph.facebook.com/" + facebookId + "/picture/?type=square";
  },

});

Template.gameRoomReadyCheck.events({
  'click .accept-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userAccept', gameRoomId, function (error, result) {});
  },

  'click .decline-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userDecline', gameRoomId, function (error, result) {});
  },

});

Template.gameRoomReadyCheck.rendered = function () {
  var gameRoomId = this.data._id;
  var gameRoom = GameRooms.findOne({_id: gameRoomId});

  allNovelistsRespondedCheck =  function() {
    var readyCheck = ReadyChecks.findOne({gameRoomId: gameRoomId});

    if ( readyCheck.accepted.length + readyCheck.declined.length ===  gameRoom.numberOfPlayers ){
      Meteor.call('readyCheckResult', gameRoomId, function (error, result) {});
    }
    Meteor.setTimeout(allNovelistsRespondedCheck, 500);
  };
  allNovelistsRespondedCheck();
};