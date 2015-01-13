Template.gameRoomPage.events({
  'click .join-game-room': function (event, template) {
    var userId = Meteor.userId();
    var gameRoomId = template.data._id;
    Meteor.call('joinGameRoom', userId, gameRoomId, function (error, result) {});
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

Template.gameRoomPage.rendered = function () {
  var gameRoomId = this.data._id;

  modalCheck =  function() {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    Session.set("gameRoomNovelistSlotsFilled", (gameRoom.numberOfPlayers === gameRoom.novelists.length) && (gameRoom.currentPhase === "Waiting for more players"));
    if (Session.get("gameRoomNovelistSlotsFilled")){
      $('#ready-check-panel').modal('show');
    } else {
      $('#ready-check-panel').modal('hide');
    }
    Meteor.setTimeout(modalCheck, 50);
  };
  modalCheck();

  switchPhaseCheck = function() {
    var gameRoom = GameRooms.findOne({_id: gameRoomId});
    if ((moment(gameRoom.currentPhaseEndTime) - moment()) < 0 && gameRoom.currentPhase !== "Waiting for more players" ) {
      Meteor.call('switchPhaseAndSetTimers', gameRoom._id, function (error, result) {});
    }

    Session.set('currentPhaseRemainingTimePretty', util.currentPhaseTimeRemaining(gameRoomId));

    if ( gameRoom.currentPhase !== "Game Ended" ) {
      Meteor.setTimeout(switchPhaseCheck, 500);
    }
  };
    switchPhaseCheck();


};
