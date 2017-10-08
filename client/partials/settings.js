Template.settings.events({
  'click #toggle-stealth': () => {
    $('textarea').toggleClass('stealth');
    Session.setPersistent('stealth', !Session.get('stealth'));
  },
  'click #toggle-backspace': () => {
    Session.setPersistent('preventbackspace', !Session.get('preventbackspace'));
  },
  'click #toggle-chromotherapy': () => {
    $('body').toggleClass('chromotherapy');
    $('textarea').toggleClass('whitefont');
    $('progress').toggleClass('chromoprogress');
    $('header').toggleClass('chromoheader');

    Session.setPersistent('chromotherapy', !Session.get('chromotherapy'));
  },
  'click #toggle-audio': () => {
    Session.setPersistent('audio', !Session.get('audio'));
    if (Session.get('audio')) {
      s.load();
    };
  }
});
Template.settings.helpers({
  backspacetoggled: () => Session.get('preventbackspace') ? 'checked' : '',
  stealthtoggled: () => Session.get('stealth') ? 'checked' : '',
  chromotoggled: () => Session.get('chromotherapy') ? 'checked' : '',
  audiotoggled: () => Session.get('audio') ? 'checked' : ''
});
