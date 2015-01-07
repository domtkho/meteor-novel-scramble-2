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
    };

    Meteor.call('createScriptSubmission', scriptProperties, function (error, result) {});
  }
});