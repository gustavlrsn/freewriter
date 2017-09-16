Meteor.methods({
  addWordCount: function (number_of_words, start_time, end_time, today, yesterday, lastdayofmonth, daysinmonth, month) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }



    var start = start_time;
    var end = end_time;
    var elapsed_time = end - start;
    var newstreak = 0;

    var unlocks = [];



    var totalWordsToday = number_of_words + Words.find({ date: today, owner: Meteor.userId() }).fetch().reduce((a, b) => a + b.number_of_words, 0);
    var totalWords = number_of_words + Words.find({ owner: Meteor.userId() }).fetch().reduce((a, b) => a + b.number_of_words, 0);

    if (Meteor.user().lastCompletedDay === yesterday) {
      if (totalWordsToday >= Meteor.user().profile.dailygoal) {
        newstreak = Meteor.user().streak + 1;
        Meteor.users.update(this.userId, {$set: {streak: newstreak}});
        Meteor.users.update(this.userId, {$set: {lastCompletedDay: today}});
      }
    } else if (Meteor.user().lastCompletedDay === today ){
      // dont do anything right?
    } else {
      if (totalWordsToday >= Meteor.user().profile.dailygoal) {
        Meteor.users.update(this.userId, {$set: {lastCompletedDay: today}}, {upsert: true});
        Meteor.users.update(this.userId, {$set: {streak: 1}}, {upsert: true});
        newstreak = 1;
      } else {
        Meteor.users.update(this.userId, {$set: {streak: 0}}, {upsert: true});
      }
    }

    // DAILY STREAK ACHIEVEMENTS
    var objArray = Achievements.find({ owner: Meteor.userId() }).fetch();
    var currentAchievements = objArray.map(function(a) {return a.type;});
    var possibleAchievements = [1, 3, 7, 14, 30, 50, 100, 365, 500, 1000];

    if(newstreak && isInArray(newstreak, possibleAchievements) && !isInArray(newstreak, currentAchievements)) {
      Achievements.insert({
        type: newstreak,
        owner: Meteor.userId(),
        createdAt: new Date()
      });
      unlocks.push(newstreak);
    }

    /// MONTHLY ACHIEVEMENTS


    if (today == lastdayofmonth && newstreak >= daysinmonth) {

      Achievements.insert({
        type: month,
        owner: Meteor.userId(),
        createdAt: new Date()
      });
      unlocks.push(month);

    }

    // TOTAL WORD ACHIEVEMENTS
    var wordsAchievements = [10000, 50000, 100000, 250000, 500000, 1000000];

    for (i = 0; i < wordsAchievements.length; i++) {
      if (totalWords < wordsAchievements[i]) {
        break;
      }
      if (totalWords >= wordsAchievements[i] && !isInArray(wordsAchievements[i], currentAchievements)) {
        Achievements.insert({
          type: wordsAchievements[i],
          owner: Meteor.userId(),
          createdAt: new Date()
        });
        unlocks.push(wordsAchievements[i]);
      }
    }


    // ENTER INTO WORDS collection
    Words.insert({
      number_of_words: number_of_words,
      elapsed_time: elapsed_time,
      createdAt: new Date(),
      date: today,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      avatar: Meteor.user().profile.avatar,
      unlocks: unlocks
    });




  },
  removeWordCount: function(id) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    //must add some verification of only removing your own stuff..
    Words.remove(id);
  }
});

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
