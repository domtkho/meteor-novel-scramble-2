Template.timerPanel.events({
  'click .start-timer': function (event, template) {
    var gameRoomProperties = {
      gameRoomId: template.data._id,
    };
    Meteor.call('beginGameAndSetTimers', gameRoomProperties, function (error, result) {});
  }
});