Template.timerCountdownTimer.helpers({
  currentPhaseTimeRemaining: function () {
    return Session.get('currentPhaseRemainingTimePretty');
  },

  showTimer: function(currentPhase) {
    var displayTimer = {
     "Waiting for more players": false,
     "Writing": true,
     "Voting": true,
     "Game Ended": false,
    };
    return displayTimer[currentPhase];
  }
});