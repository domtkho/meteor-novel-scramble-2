Template.timerCurrentPhase.helpers({
  returnLabelColor: function (currentPhase) {
    var config = {
      "Writing": "label-success",
      "Voting": "label-info",
    };
    return config[currentPhase];
  },

});