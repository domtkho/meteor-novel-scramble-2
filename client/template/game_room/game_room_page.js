Template.gameRoomPage.helpers({

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
  }

});

Template.gameRoomPage.events({
  'click .join-game-room': function (event, template) {
    var userId = Meteor.userId();
    var gameRoomId = template.data._id;
    Meteor.call('joinGameRoom', userId, gameRoomId, function (error, result) {});

    var gameRoom = GameRooms.findOne({_id: template.data._id});
    if( (gameRoom.numberOfPlayers === gameRoom.novelists.length) && (gameRoom.currentPhase === "Waiting for more players") ){
      // Append modal for ready check
      $('#ready-check-panel').modal('show');
    }
  },

  'click .leave-game-room': function (event, template) {
    var userId = Meteor.userId();
    var gameRoomId = template.data._id;
    Meteor.call('leaveGameRoom', userId, gameRoomId, function (error, result) {});
  },

  'mouseenter .occupied-slot': function (event) {
    var $this = $(event.target);
    $this.find("button.leave-game-room").show();
    $this.find(".current-user").hide();
  },

  'mouseleave .occupied-slot': function (event) {
    var $this = $(event.target);
    $this.find("button.leave-game-room").hide();
    $this.find(".current-user").show();
  },

});
