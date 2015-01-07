util = {};

util.currentPhaseTimeRemaining = function (gameRoomId) {

  var gameRoom = GameRooms.findOne({_id: gameRoomId});

  var timeRemaining = moment(gameRoom.currentPhaseEndTime) - moment();
  var minutes = Math.floor((timeRemaining) / (1000 * 60));
  var seconds = Math.floor((timeRemaining - (minutes * 1000 * 60)) / 1000);
  var milliseconds = Math.floor(timeRemaining - (minutes * 1000 * 60) - (seconds * 1000));
  return minutes + " min " + seconds + " sec " + milliseconds;
};