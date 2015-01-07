Template.gameRoomCreate.rendered = function () {
  $.material.init();
};

Template.gameRoomCreate.events({
  'submit form': function (event) {
    event.preventDefault();

    var gameRoomProperties = {
      title: $(event.target).find('[name=title]').val(),
      genre: $(event.target).find('[name=genre]').val(),
      intro: $(event.target).find('[name=introduction-paragraph]').val(),
      numberOfPlayers: parseInt($(event.target).find('[name=number-of-players]').val()),
      privateMode: $(event.target).find('[name=private-mode]').val() === "true",
      currentPhase: "Waiting for more players"
    };

    Meteor.call('createGameRoom', gameRoomProperties, function (error, result) {});
    $('#create-game-room').modal('hide');
  },

  'click #private-mode': function(){
    var checked = $('#private-mode').val() === "true";
    $('#private-mode').val(checked? "false" : "true");
  }
});