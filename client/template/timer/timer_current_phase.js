Template.timerCurrentPhase.helpers({
  returnLabelColor: function (currentPhase) {
    var config = {
      "Writing": "label-success",
      "Voting": "label-info",
      "Game Ended": 'label-warning',
    };
    return config[currentPhase];
  },

});