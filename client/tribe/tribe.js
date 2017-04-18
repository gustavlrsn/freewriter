Template.tribe.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('tribewords');
  });
});

Template.tribe.helpers({
  entries: ()=> {
    // var today = moment().format('YYYY-MM-DD');
    //find created At last 24 hrs.
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    var inputdate = new Date(yesterday.toISOString());

    return Words.find({ 'createdAt': {$gte: inputdate }}, {limit: 10, sort: {createdAt: -1}});

  },

  tribeWordsToday: function () {
    // var today = moment().format('YYYY-MM-DD');
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    var inputdate = new Date(yesterday.toISOString());

    var total = Words.find({ 'createdAt': {$gte: inputdate }}).fetch().map(item => item.number_of_words).reduce((a, b) => a + b, 0);
    return total;
  },
  numberOfWriters: function () {
    //var today = moment().format('YYYY-MM-DD');
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    var inputdate = new Date(yesterday.toISOString());

    var array = Words.find({ 'createdAt': {$gte: inputdate }}).fetch();
    var distinctArray = _.uniq(array, false, function(d) {return d.owner});
    var distinctValues = _.pluck(distinctArray, 'owner');
    return distinctValues.length;
  },
  currentMonth: function () {
    var thismonth = moment().format('YYMM');
    return thismonth;
  },

  toMinutes: function(milliseconds){
    return Math.round(moment.duration(milliseconds).asMinutes());
  },
  toTime: function(date){
    return moment(date).format('HH:mm');
  }
});
