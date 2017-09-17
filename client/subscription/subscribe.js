// EU VAT RATES as of 2016-01-01 based on ISO-3366-1: Alpha-2 Codes
var vatrate = { BE: 21, BG: 20, CZ: 21, DK: 25, DE: 19, EE: 20, IE: 23, GR: 23, ES: 21, FR: 20, HR: 25, IT: 22, CY: 19, LV: 21, LT: 21, LU: 17, HU: 27, MT: 18, NL: 21, AT: 20, PL: 23, PT: 23, RO: 20, SI: 22, SK: 20, FI: 24, SE: 25, GB: 20 };

var key = Meteor.settings.public.stripe.livePublishableKey;

Template.subscribe.onRendered(function(){
  Session.set("taxpercent", 0);
});
Template.subscribe.events({
  'change #country': function() {
    var val = $("#country option:selected").val();
    var taxpercent = vatrate[val];
    if (taxpercent > 0) {
      Session.set("taxpercent", taxpercent);
    } else {
      Session.set("taxpercent", 0);
    }
    console.log("country: " + val + " and VAT RATE: " + taxpercent);
  },
  'click [data-id=monthly]': function(e) {
    e.preventDefault();


    var user_country = $("#country option:selected").val();


    var ip_country;
    // fixa IP check!!!...

    var tax_percent = Session.get("taxpercent");
    var total = 400*(1 + tax_percent/100);

    if (user_country !== "") {
      StripeCheckout.open({
        key: key,
        amount: total,
        name: 'Freewriter',
        email: Meteor.user().emails[0].address,
        image: 'https://freewriter.io/freewrite-logo-square.png',
        description: 'Monthly subscription',
        panelLabel: 'Subscribe',
        allowRememberMe: false,
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          var card_country = res.card.country;

          if(card_country == user_country || ip_country == user_country) {

            Meteor.call('createMonthly', stripeToken, tax_percent, user_country, card_country, ip_country, function(error, response) {
              if(error) {
                console.log(error);
              } else {
                FlowRouter.go("/manage-subscription");
                AntiModals.overlay("thanks");
                analytics.identify( Meteor.userId(), {
                  subscription: "monthly",
                });
                analytics.track("Subscribed", {
                  plan: "monthly",
                });
              }
            });

          } else {
            AntiModals.overlay("failedmatch");
          }
        }
      });
    } else {
      Bert.alert("Select your country!");
      // kod att highlighta #countryselect!
    }

  },

  'click [data-id=yearly]': function(e) {
    e.preventDefault();


    var user_country = $("#country option:selected").val();


    var ip_country;
    // fixa IP check!!!...

    var tax_percent = Session.get("taxpercent");
    var total = 4000*(1 + tax_percent/100);

    if (user_country !== "") {
      StripeCheckout.open({
        key: key,
        amount: total,
        name: 'Freewriter',
        email: Meteor.user().emails[0].address,
        image: 'https://freewriter.io/freewrite-logo-square.png',
        description: 'Yearly subscription',
        panelLabel: 'Subscribe',
        allowRememberMe: false,
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          var card_country = res.card.country;

          if(card_country == user_country || ip_country == user_country) {

            //okej, nu ska jag skicka med ipcountry, usercountry, och cardcountry.
            Meteor.call('createYearly', stripeToken, tax_percent, user_country, card_country, ip_country, function(error, response) {
              if(error) {
                console.log(error);
              } else {
                console.log(response);
                FlowRouter.go("/manage-subscription");
                AntiModals.overlay("thanks");
                analytics.identify( Meteor.userId(), {
                  subscription: "yearly",
                });
                analytics.track("Subscribed", {
                  plan: "yearly",
                });
              }
            });

          } else {
            AntiModals.overlay("failedmatch");
          }
        }
      });
    } else {
      Bert.alert("Select your country!");
      // kod att highlighta #countryselect!
    }

  }
});

Template.subscribe.helpers({
  taxpercent: function() {
    return 0.20;
  },
  vat: function() {
    if (Session.get("taxpercent") > 0) {
      return "+ " + Session.get("taxpercent") + "% VAT";
    }
  },
  dontshowsubscribe: function() {
    var now = moment().unix();
    var user = Meteor.users.findOne({ _id: Meteor.userId() });
    if (user && user.subscription){
      var ends = user.subscription.ends;
      if (user.subscription.status == "trialing") {
        return false;
      } else if (now > ends){
        return false;
      } else {
        return true;
      }
    }
  }
});
