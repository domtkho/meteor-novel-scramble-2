Template.timerPanel.events({
  'click .start-timer': function (event, template) {
    var gameRoomProperties = {
      gameRoomId: template.data._id,
    };
    Meteor.call('beginGameAndSetTimers', gameRoomProperties, function (error, result) {});
  }
});

Template.timerPanel.helpers({
  currentPhaseTimeRemaining: function () {
    return Session.get('currentPhaseRemainingTimePretty');
  }
});

Template.timerPanel.rendered = function () {

  var currentGameRoomId = this.data._id;

  updateTimers = function(){
    Session.set('currentPhaseRemainingTimePretty', util.currentPhaseTimeRemaining(currentGameRoomId));
    Meteor.setTimeout(updateTimers, 50);
  };

  updateTimers();

};