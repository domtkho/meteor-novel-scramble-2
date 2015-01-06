Template.gameRoomList.helpers({
  gameRooms: function () {
    return GameRooms.find();
  },

  novelistsCount: function(maxNumberOfNovelists, array){
    return (maxNumberOfNovelists - array.length);
  }
});

// Template.gameRoomList.events({
//   'click .join-room': function () {
//     alert(this.title);
//   }
// });