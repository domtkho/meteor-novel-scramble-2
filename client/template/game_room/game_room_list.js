Template.gameRoomList.helpers({
  gameRooms: function () {
    return GameRooms.find();
  },

  novelistsCount: function(maxNumberOfNovelists, array){
    return (maxNumberOfNovelists - array.length);
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