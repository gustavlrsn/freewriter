import Future from 'fibers/future';
import Fiber from 'fibers';

var secret = Meteor.settings.private.stripe.liveSecretKey;
var Stripe = StripeAPI(secret);

Meteor.methods({
  'createMonthly': function(stripeToken, tax_percent, user_country, card_country, ip_country) {
    check(stripeToken, String);

    Stripe.customers.create({
      source: stripeToken,
      plan: "monthly",
      tax_percent: tax_percent,
      email:  Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(error, customer){
      if (error) {
        console.log(error);
      } else {

        var subscription = {
          stripeId: customer.id,
          plan: customer.subscriptions.data[0].plan.id,
          ends: customer.subscriptions.data[0].current_period_end,
          status: customer.subscriptions.data[0].status,
          country_data: {
            user_country: user_country,
            card_country: card_country,
            ip_country: ip_country
          },
          payment: {
            card: {
              type: customer.sources.data[0].brand,
              lastFour: customer.sources.data[0].last4,
              country: customer.sources.data[0].country
            },
            nextPaymentDue: customer.subscriptions.data[0].current_period_end,
            tax_percent: tax_percent
          }
        };
        console.log(subscription);
        Meteor.users.update( { _id: Meteor.userId() }, {$set: {subscription: subscription}}, {upsert: true});
      }
    }));
  },
  'createYearly': function(stripeToken, tax_percent, user_country, card_country, ip_country) {
    check(stripeToken, String);

    Stripe.customers.create({
      source: stripeToken,
      plan: "yearly",
      tax_percent: tax_percent,
      email:  Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(error, customer){
      if (error) {
        console.log(error);
      } else {

        var subscription = {
          stripeId: customer.id,
          plan: customer.subscriptions.data[0].plan.id,
          ends: customer.subscriptions.data[0].current_period_end,
          status: customer.subscriptions.data[0].status,
          country_data: {
            user_country: user_country,
            card_country: card_country,
            ip_country: ip_country
          },
          payment: {
            card: {
              type: customer.sources.data[0].brand,
              lastFour: customer.sources.data[0].last4,
              country: customer.sources.data[0].country
            },
            nextPaymentDue: customer.subscriptions.data[0].current_period_end,
            tax_percent: tax_percent
          }
        };
        console.log(subscription);
        Meteor.users.update( { _id: Meteor.userId() }, {$set: {subscription: subscription}}, {upsert: true});
      }
    }));
  },

  stripeCancelSubscription: function(){
    // Because Stripe's API is asynchronous (meaning it doesn't block our function
    // from running once it's started), we need to make use of the Fibers/Future
    // library. This allows us to create a return object that "waits" for us to
    // return a value to it.
    var stripeCancelSubscription = new Future();

    // Before we jump into everything, we need to get our customer's ID. Recall
    // that we can't send this over from the client because we're *not* publishing
    // it to the client. Instead, here, we take the current userId from Meteor
    // and lookup our customerId.
    var user    = Meteor.userId();
    var getUser = Meteor.users.findOne({"_id": user}, {fields: {"subscription.stripeId": 1}});

    // Once we have our customerId, call to Stripe to cancel the active subscription.
    Stripe.customers.cancelSubscription(getUser.subscription.stripeId, {
      at_period_end: true
    }, function(error, response){
      if (error) {
        stripeCancelSubscription.return(error);
      } else {
        // Because we're running Meteor code inside of another function's callback, we need to wrap
        // it in a Fiber. Note: this is a verbose way of doing this. You could refactor this
        // and the call to Stripe to use a Meteor.wrapAsync method instead. The difference is
        // that while wrapAsync is cleaner syntax-wise, it can be a bit confusing. To keep
        // things simple, we'll stick with a Fiber here.
        Fiber(function(){
          var update = {
            user: user,
            subscription: {
              status: response.cancel_at_period_end ? "canceled" : response.status,
              ends: response.current_period_end
            }
          };
          Meteor.call('updateUserSubscription', update, function(error, response){
            if (error){
              stripeCancelSubscription.return(error);
            } else {
              stripeCancelSubscription.return(response);
            }
          });
        }).run();
      }
    });

    return stripeCancelSubscription.wait();
  },


  updateUserSubscription: function(update){
    // Check our update argument against our expected pattern.
    check(update, {user: String, subscription: {status: String, ends: Number}});

    // Here, we need to create a new Future because we'll be returning this information back to
    // our Stripe method. Note, we're mostly doing this because we're "blocking" the return of our
    // update method below in order to check the security of our method call. Certainly a trade-off,
    // but considering it nets us an extra touch of security, not that bad.
    var updateUserSubscription = new Future();

    // If arguments are valid, continue with updating the user.
    Meteor.users.update(update.user, {
      $set: {
        "subscription.status": update.subscription.status,
        "subscription.ends": update.subscription.ends,
        "subscription.payment.nextPaymentDue": update.subscription.ends
      }
    }, function(error, response){
      if (error) {
        updateUserSubscription.return(error);
      } else {
        updateUserSubscription.return(response);
      }
    });


    return updateUserSubscription.wait();
  }
});
