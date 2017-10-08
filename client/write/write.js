var header;

import autosize from 'autosize';

s = new buzz.sound('/sound/silent-running.mp3', {
    preload: false,
    autoplay: false,
    loop: true
});
var audioTimeout;
var isPlaying;
var isScrolledToBottom = true;

Template.write.onRendered(function() {

  $(window).scroll(function(){
    isScrolledToBottom = document.body.scrollHeight - window.innerHeight <= document.documentElement.scrollTop;
  });

  //document.title = "Freewriter (" + Session.get("count") + ")";
  $('textarea').val(Session.get("writings"));

  autosize($('#writingarea'));

  header = $('header');

  $('textarea').focus();

  // if (!Session.get("count")) {
  //   Session.set("count", 0);
  // }
  //
  // document.title = "Freewriter (" + Session.get("count") + ")";

  if (Session.get("stealth")) {
    $('textarea').addClass('stealth');
  }

  if (Session.get("chromotherapy")) {
    $('body').addClass('chromotherapy');
    $('progress').addClass('chromoprogress');
    $('header').addClass('chromoheader');
    $('textarea').addClass('whitefont');
  }
});

Template.write.events({
  'input textarea': function() {
    if(isScrolledToBottom) {
      document.documentElement.scrollTop = 10000000;
    }
  },
  'keyup textarea': function () {

    Session.set("writings", $('textarea').val());

    Session.set("count", $('textarea').val().split(/\s+/).length);
    //Session.setAuth("count", countWords($('textarea').val()));
    if (Session.get("writings") == "") {
      Session.set("count", 0);
    }
    if (!Session.get("start_time")) {
      Session.set("start_time", Date.now());

    }
    if (Session.get("count") == 0) {
      Session.clear("start_time");
    }
    document.title = "Freewriter (" + Session.get("count") + ")";
  },
  'keydown': function (event) {
    if (event.which == 8 && Session.get("preventbackspace")) {
      event.preventDefault();
      // shake the writing area. uses Jquery UI package
      // $("#writingarea").effect( "shake" );
    }

    mousemove = 0;
    if (!isFaded) {
      //header.stop().fadeOut(2000);

      header.stop().animate({ opacity: 0 });
      isFaded = true;
    }

    if(Session.get("audio")) {
      if (!isPlaying) {
        s.play().fadeIn(100);
        isPlaying = true;
      }
      clearTimeout(audioTimeout);

      audioTimeout = setTimeout(function(){
        s.fadeOut(50, function() {
          isPlaying = false;
        });
      }, 2000);
    }
  }
});
Template.write.helpers({
  counter: () => Session.get('count'),
});

function countWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    return s.split(' ').length;
};
