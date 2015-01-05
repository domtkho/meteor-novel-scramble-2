Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
  name: 'gameRoomLobby'
});

Router.route('/create', {
  name: 'gameRoomCreate'
});
