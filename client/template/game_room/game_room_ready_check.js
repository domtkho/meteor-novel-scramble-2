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
  'click .accept-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userAccept', gameRoomId, function (error, result) {});
  },

  'click .decline-button': function () {
    var gameRoomId = this._id;
    Meteor.call('userDecline', gameRoomId, function (error, result) {});
  },

});