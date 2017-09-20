var seoPicker = Picker.filter(function(req, res) {
  var isCrawler = [];
  var string = req.headers['user-agent'];
  isCrawler.push(/_escaped_fragment_/.test(req.url));
  if(string){
      isCrawler.push(string.indexOf('facebookexternalhit') >= 0);
      isCrawler.push(string.indexOf('Slack') >= 0);
      isCrawler.push(string.indexOf('Twitterbot') >= 0);
  }
  return isCrawler.indexOf(true) >= 0;
});

// Indexing user pages
seoPicker.route('/@:username', function(params, req, res){
    var user = Meteor.users.findOne({ username: params.username });
    var html = SSR.render('seoLayout',{
        template: 'seoProfile',
        data: { user: user }
    });
    res.end(html);
});
