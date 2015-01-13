Template.scriptsCurrentChapterScripts.helpers({
  allScriptsForThisChapter: function () {
    return Scripts.find({gameRoomId: this._id, chapter: this.currentChapter});
  },
});