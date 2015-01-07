Template.gameRoomReadyCheck.helpers({

  novelists: function () {
    return this.novelists;
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
  'click .ready-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userIsReady', gameRoomId, function (error, result) {});
  },

  'click .not-ready-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userIsNotReady', gameRoomId, function (error, result) {});
  },

});