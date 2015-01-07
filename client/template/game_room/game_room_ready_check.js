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