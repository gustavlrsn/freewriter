if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('write');
  });
  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId()) {
    redirect('/')
  }
}

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/write')
  }
}

function leavingWrite () {
  if (Session.get("chromotherapy")) {
    $('body').removeClass('chromotherapy');
    $('progress').removeClass('chromoprogress');
    $('header').removeClass('chromoheader');
  }
  document.documentElement.scrollTop = 0;
}

FlowRouter.route('/write', {
  name: 'write',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'write'});
  },
  triggersExit: [leavingWrite]
});
FlowRouter.route('/done', {
  name: 'done',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'done'});
  }
});

FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [redirectIfLoggedIn],
  action() {
    DocHead.setTitle("Freewriter");
    DocHead.addMeta({property: 'og:image', content: 'https://freewriter.io/freewrite1400.png'});
    DocHead.addMeta({property: 'og:image:width', content: '1400'});
    DocHead.addMeta({property: 'og:image:height', content: '1400'});
    DocHead.addMeta({property: 'og:title', content: 'Freewriter'});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'og:description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});
    DocHead.addMeta({property: 'og:url', content: 'https://freewriter.io'});
    // DocHead.addMeta({property: 'og:keywords', content: 'X'});
    // DocHead.addMeta({property: 'fb:app_id', content: 'X'});
    DocHead.addMeta({property: 'description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});
    DocHead.addMeta({property: 'keywords', content: 'freewriting, morning pages, free writing'});
    DocHead.addMeta({property: 'twitter:card', content: 'summary_large_image'});
    DocHead.addMeta({property: 'twitter:title', content: 'Freewriter'});
    DocHead.addMeta({property: 'twitter:image', content: 'https://freewriter.io/freewrite1400.png'});
    DocHead.addMeta({property: 'twitter:site', content: '@tryfreewrite'});
    DocHead.addMeta({property: 'twitter:description', content: 'Experience the magic of freewriting. Write every day, without stopping to judge or edit.'});

    BlazeLayout.render('HomeLayout');
  }
});


FlowRouter.route('/tribe', {
  name: 'tribe',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'tribe'});
  }
});

FlowRouter.route('/@:username', {
  name: 'profilepage',
  action() {
    BlazeLayout.render('MainLayout', {main: 'profilepage'})
  }
});

FlowRouter.route('/edit-profile', {
  name: 'editprofile',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'editprofile'});
  }
});


FlowRouter.route('/edit-name', {
  name: 'editname',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'editname'});
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action() {

    BlazeLayout.render('MainLayout', {main: 'faq'});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  triggersEnter: [redirectIfLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'login'});
  }
});

FlowRouter.route('/recover-password', {
  name: 'recover-password',
  triggersEnter: [redirectIfLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'ForgotPassword'});
  }
});

FlowRouter.route('/reset-password/:token', {
  name: 'reset-password',
  triggersEnter: [redirectIfLoggedIn],
  action( params ) {
    Accounts._resetPasswordToken = params.token;

    BlazeLayout.render('MainLayout', {main: 'ResetPassword'});
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  triggersEnter: [redirectIfLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'chooseavatar'});
  }
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( 'write' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});

FlowRouter.route('/subscribe', {
  name: 'subscribe',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'subscribe'});
  }
});

FlowRouter.route('/manage-subscription', {
  name: 'managesub',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'managesub'});
  }
});

FlowRouter.route('/receipt/:id', {
  name: 'invoice',
  triggersEnter: [checkLoggedIn],
  action() {

    BlazeLayout.render('MainLayout', {main: 'invoice'});
  }
});
