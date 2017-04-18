Template.chooseavatar.onCreated(function() {
  Session.setTemp("avatar", "achebe");
});

Template.chooseavatar.events({
  'click .next': function() {
    BlazeLayout.render('MainLayout', {main: 'setdailygoal'});
  },
  'click #salinger': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "salinger");
    $('#salinger').addClass('selected');
  },
  'click #angelou': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "angelou");
    $('#angelou').addClass('selected');
  },
  'click #beckett': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "beckett");
    $('#beckett').addClass('selected');
  },
  'click #christie': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "christie");
    $('#christie').addClass('selected');
  },
  'click #dali': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "dali");
    $('#dali').addClass('selected');
  },
  'click #dostoyevsky': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "dostoyevsky");
    $('#dostoyevsky').addClass('selected');
  },
  'click #hemingway': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "hemingway");
    $('#hemingway').addClass('selected');
  },
  'click #joyce': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "joyce");
    $('#joyce').addClass('selected');
  },
  'click #jung': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "jung");
    $('#jung').addClass('selected');
  },
  'click #kafka': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "kafka");
    $('#kafka').addClass('selected');
  },
  'click #lennon': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "lennon");
    $('#lennon').addClass('selected');
  },
  'click #nietzsche': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "nietzsche");
    $('#nietzsche').addClass('selected');
  },
  'click #orwell': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "orwell");
    $('#orwell').addClass('selected');
  },
  'click #rand': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "rand");
    $('#rand').addClass('selected');
  },
  'click #steinbeck': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "steinbeck");
    $('#steinbeck').addClass('selected');
  },
  'click #tolkien': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "tolkien");
    $('#tolkien').addClass('selected');
  },
  'click #tolstoy': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "tolstoy");
    $('#tolstoy').addClass('selected');
  },
  'click #vonnegut': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "vonnegut");
    $('#vonnegut').addClass('selected');
  },
  'click #watts': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "watts");
    $('#watts').addClass('selected');
  },
  'click #woolf': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "woolf");
    $('#woolf').addClass('selected');
  },
  'click #achebe': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "achebe");
    $('#achebe').addClass('selected');
  },
  'click #adams': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "adams");
    $('#adams').addClass('selected');
  },
  'click #ali': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "ali");
    $('#ali').addClass('selected');
  },
  'click #arendt': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "arendt");
    $('#arendt').addClass('selected');
  },
  'click #baldwin': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "baldwin");
    $('#baldwin').addClass('selected');
  },
  'click #barnes': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "barnes");
    $('#barnes').addClass('selected');
  },
  'click #beauvoir': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "beauvoir");
    $('#beauvoir').addClass('selected');
  },
  'click #earhart': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "earhart");
    $('#earhart').addClass('selected');
  },
  'click #gordimer': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "gordimer");
    $('#gordimer').addClass('selected');
  },
  'click #huxley': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "huxley");
    $('#huxley').addClass('selected');
  },
  'click #kahlo': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "kahlo");
    $('#kahlo').addClass('selected');
  },
  'click #kerouac': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "kerouac");
    $('#kerouac').addClass('selected');
  },
  'click #lee': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "lee");
    $('#lee').addClass('selected');
  },
  'click #marquez': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "marquez");
    $('#marquez').addClass('selected');
  },
  'click #nin': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "nin");
    $('#nin').addClass('selected');
  },
  'click #plath': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "plath");
    $('#plath').addClass('selected');
  },
  'click #rich': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "rich");
    $('#rich').addClass('selected');
  },
  'click #suyin': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "suyin");
    $('#suyin').addClass('selected');
  },
  'click #thoreau': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "thoreau");
    $('#thoreau').addClass('selected');
  },
  'click #tupac': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "tupac");
    $('#tupac').addClass('selected');
  },
  'click #weil': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "weil");
    $('#weil').addClass('selected');
  },
  'click #whitman': function(e) {
    e.preventDefault();
    $('#' + Session.get("avatar")).removeClass('selected');
    Session.setTemp("avatar", "whitman");
    $('#whitman').addClass('selected');
  }
});

Template.setdailygoal.events({
  'click .next': function() {
    var dailygoal = document.getElementById("dailygoal").value;
    var n = Number(dailygoal);
    check(n, Number);
    if(n>0){
      Session.setTemp("dailygoal", n);
      BlazeLayout.render('MainLayout', {main: 'signup'});
    } else {
      Bert.alert("Input a valid number above 0!");
    }

  }
});


Template.signup.events({
    'submit .signup-form': function (event) {

        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;
        var name = event.target.name.value;
        var avatar = Session.get("avatar");
        var dailygoal = Session.get("dailygoal");

        var user = {'email': email, password: password, profile: {name: name, avatar: avatar, dailygoal: dailygoal}};

        Accounts.createUser(user,function(err){
            if(err) {
                Bert.alert( (err.reason), 'danger', 'growl-top-right' );
            } else {
              Meteor.call( 'sendVerificationLink', ( error, response ) => {
                if ( error ) {
                  Bert.alert( error.reason, 'danger', 'growl-top-right' );
                }
              });
              FlowRouter.go('write');

              analytics.identify( Meteor.userId(), {
                email: Meteor.user().emails[0].address,
                name: Meteor.user().profile.name,
                goal: Meteor.user().profile.dailygoal,
                subscription: "trial"
              });


              AntiModals.overlay("welcome");
            }
        });
    }
});
