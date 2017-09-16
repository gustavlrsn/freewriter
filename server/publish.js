Meteor.publish("tribewords", function () {
  // var today = moment().format('YYYY-MM-DD');
  var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  var inputdate = new Date(yesterday.toISOString());

  return Words.find({ 'createdAt': {$gte: inputdate } });
});

Meteor.publish("achievements", function () {
  return Achievements.find({'owner': this.userId});
});

Meteor.publish("userwords", function () {
  return Words.find({'owner': this.userId});
});

Meteor.publish("wordsPerDay", function() {
  ReactiveAggregate(this, Words, [{
    $match: { owner: this.userId }
  }, {
    $group: {
      '_id': '$date',
      'total': {
        $sum: '$number_of_words'
      }
    }
  }], { clientCollection: "aggregatedWords" });
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'streak': 1, 'lastCompletedDay': 1, 'subscription': 1}});
});

Meteor.publish("invoices", function () {
  return Invoices.find({'owner': this.userId});
});

Meteor.publish("singleInvoice", function(id) {
  check(id, String);

  return Invoices.find({_id: id});
});

Meteor.publish('singleUser', function(username) {
  check(username, String);
  var userId = Meteor.users.findOne({ username: username })._id;

  ReactiveAggregate(this, Words, [{
    $match: { owner: userId }
  }, {
    $group: {
      '_id': '$date',
      'total': {
        $sum: '$number_of_words'
      }
    }
  }], { clientCollection: "aggregatedWords" });

  return [
    Meteor.users.find({ _id: userId }, { fields: { 'streak': 1, 'lastCompletedDay': 1, 'username': 1, 'profile': 1 }}),
    Words.find({ owner: userId }),
    Achievements.find({ owner: userId })
  ];
})
