import Clipboard from 'clipboard';

Template.header.onRendered(function() {
  var clipboard = new Clipboard('#copy');

  clipboard.on('success', function(e) {
      $('.inner').html('Copy to clipboard<br>Copied!');
      e.clearSelection();
  });

  clipboard.on('error', function(e) {
      $('.inner').html('Copy to clipboard<br>⌘+C to copy');
  });

});

Template.header.events({
  'click .signout': function() {
    event.preventDefault();

    Meteor.logout(function(error){
      if(error){
        alert(error.reason);
      } else {
        FlowRouter.go('/')
        Session.clear();
      }
    });
  },
  'click [data-id=letitgo]': function() {
    var number_of_words = Session.get("count");
    var start_time = Session.get("start_time");
    var end_time = Date.now();
    var today = moment().format('YYYY-MM-DD');
    var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    var lastdayofmonth = moment().endOf('month').format('YYYY-MM-DD');
    var daysinmonth = moment().daysInMonth();
    var month = moment().format('YYMM');


    if (!number_of_words == 0) {
      Session.setTemp("latest_words", number_of_words);
      Session.setTemp("latest_time", end_time - start_time);

      $('#letitgo').attr('disabled', true);

      Meteor.call("addWordCount", number_of_words, start_time, end_time, today, yesterday, lastdayofmonth, daysinmonth, month, function(){

        Session.setAuth("count", 0);

        // outside before
        Session.clear("writings");

        Session.clear("start_time");
        document.title = "Freewrite";
        Tooltips.hide();

        // FlowRouter.go("you");

        AntiModals.overlay("done");

        analytics.track('Wrote', {
          words: number_of_words
        });
        analytics.identify( Meteor.userId(), {
          email: Meteor.user().emails[0].address,
          username: Meteor.user().username,
          goal: Meteor.user().profile.dailygoal,
          streak: Meteor.user().streak,
          lastday: Meteor.user().lastCompletedDay
        });

      });
      FlowRouter.go("you");

    }
  },
  'click [data-id=save]': function() {
    var blob = new Blob([Session.get("writings")], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Freewrite " + moment(new Date()).format('YYYY-MM-DD') + " - " + Session.get("count") + " words" + ".txt");
  },
  'click [data-id=toggle-fullscreen]': function () {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
});

Template.header.helpers({
  isActivePathYou: () => ActiveRoute.path('/@' + Meteor.user().username) ? 'active' : false
});
