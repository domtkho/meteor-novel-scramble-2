Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
});

Router.route('/', { name: 'gameRoomLobby' });

Router.route('/game_room/:_id', {
  name: 'gameRoomPage',
  data: function() { return GameRooms.findOne(this.params._id); }
});

var requireLogin = function() {
  if ( ! Meteor.user() ) {
    if ( Meteor.loggingIn() ){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'gameRoomPage'});
// Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

