Scripts = new Mongo.Collection('scripts');

Meteor.methods({
  createScriptSubmission: function(scriptProperties) {

    var user = Meteor.user();

    var scriptPropertiesComplete = _.extend(scriptProperties, {
      userId: user._id,
    });

    Scripts.insert(scriptPropertiesComplete);

    $('#script-paragraph').slideUp();
    $('.help-block').fadeOut();
    $('.submit-script-button').fadeOut();

  }
});