Template.timerPanel.helpers({
  currentPhaseTimeRemaining: function () {
    return Session.get('currentPhaseRemainingTimePretty');
  },

  showTimer: function() {
    return (this.currentPhase !== "Waiting for more players");
  }
});