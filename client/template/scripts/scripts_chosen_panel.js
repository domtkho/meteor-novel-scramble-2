Template.scriptsChosenPanel.helpers({

  novelists: function () {
    var availableSlots = this.maxPlayer - this.novelists.length;
    dummyArray = this.novelists;
    for (var i = 0; i < availableSlots; i++) {
      dummyArray.push(null);
    }
    return dummyArray;
  },

  novelistName: function(novelistId) {
    return Meteor.users.findOne({_id: novelistId}).profile.name;
  },

  chosenScripts: function () {
    var latestChapter = this.currentChapter;
    var chosenScripts = [];
    for (var i = 1; i <= latestChapter; i++) {
      chosenScripts.push( Scripts.find({gameRoomId: this._id, chapter: i}, {sort: {voteCount: -1}, limit: 1 } ).fetch()[0]) ;
    }
    return _.compact(chosenScripts);
  },

});