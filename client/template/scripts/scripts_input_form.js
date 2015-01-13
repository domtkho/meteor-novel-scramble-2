Template.scriptsInputForm.helpers({
  userHasNotSubmittedScript: function () {
    var gameRoom = GameRooms.findOne({_id: this._id});
    return _.indexOf( gameRoom.novelistsSubmittedForCurrentChapter, Meteor.userId() ) < 0 ? true : false;
  }
});

Template.scriptsInputForm.rendered = function () {
  $.material.init();
};

Template.scriptsInputForm.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var script = $(event.target).find('[name=script-paragraph]').val();

    var scriptProperties = {
      script: script,
      gameRoomId: template.data._id,
      chapter: template.data.currentChapter,
    };

    Meteor.call('createScriptSubmission', scriptProperties, function (error, result) {});
  }
});