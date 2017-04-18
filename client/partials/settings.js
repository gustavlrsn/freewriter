Template.settings.events({
  'click #toggle-stealth': function() {
    $('textarea').toggleClass('stealth');
    Session.set("stealth", !Session.get("stealth"));
  },
  'click #toggle-backspace': function() {
    Session.set("preventbackspace", !Session.get("preventbackspace"));
  },
  'click #toggle-chromotherapy': function() {
    $('body').toggleClass('chromotherapy');
    $('textarea').toggleClass('whitefont');
    $('progress').toggleClass('chromoprogress');
    $('header').toggleClass('chromoheader');

    Session.set("chromotherapy", !Session.get("chromotherapy"));
  },
  'click #toggle-audio': function() {
    Session.set("audio", !Session.get("audio"));
    if (Session.get("audio")) {
      s.load();
    };
  }
});
Template.settings.helpers({
  backspacetoggled: function() {
    if (Session.get("preventbackspace")) {
      return "checked";
    } else {
      return "";
    }
  },
  stealthtoggled: function() {
    if (Session.get("stealth")) {
      return "checked";
    } else {
      return "";
    }
  },
  chromotoggled: function() {
    if (Session.get("chromotherapy")) {
      return "checked";
    } else {
      return "";
    }
  },
  audiotoggled: function() {
    if (Session.get("audio")) {
      return "checked";
    } else {
      return "";
    }
  }
});
