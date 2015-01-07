Template.gameRoomList.helpers({
  gameRooms: function () {
    return GameRooms.find();
  },

  novelistName: function(novelistId){
    return Meteor.users.findOne({_id: novelistId}).profile.name;
  }
});

// Template.gameRoomList.events({
//   'click .join-room': function () {
//     alert(this.title);
//   }
// });