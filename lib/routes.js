Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'gameRoomLobby'
});

Router.route('/game_room/:_id', {
  name: 'gameRoomPage',
  data: function() { return GameRoom.findOne(this.params._id); }
});
