Template.gameRoomCreate.rendered = function () {
  $.material.init();
};

Template.gameRoomCreate.events({
  'submit form': function (event) {
    event.preventDefault();

    var gameRoomProperties = {
      gameOwner: Meteor.userId(),
      title: $(event.target).find('[name=title]').val(),
      genre: $(event.target).find('[name=genre]').val(),
      intro: $(event.target).find('[name=introduction-paragraph]').val(),
      minPlayer: parseInt($(event.target).find('[name=min-player]').val()),
      maxPlayer: parseInt($(event.target).find('[name=max-player]').val()),
      privateMode: $(event.target).find('[name=private-mode]').val(),
      novelists: [Meteor.userId()],
    };

    console.log(gameRoomProperties);
    // GameRooms.insert(gameRoomProperties);
    $('#create-game-room').modal('hide');
  }
});