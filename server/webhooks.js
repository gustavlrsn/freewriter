var bodyParser = require('body-parser');

Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/webhooks/stripe', function (params, request, response) {
  console.log("Webhook / stripe");

  var req = request.body;

  switch(req.type){
    case "customer.subscription.updated":
      stripeUpdateSubscription(req.data.object);
      break;
    case "invoice.payment_succeeded":
      stripeCreateInvoice(req.data.object);
      break;
  }

  response.statusCode = 200;
  response.end('Thank you Stripe!\n');
});

stripeUpdateSubscription = function(request){
  var getUser = Meteor.users.findOne({"subscription.stripeId": request.customer}, {fields: {"_id": 1}});

  if (getUser){

    var update = {
      user: getUser._id,
      subscription: {
        status: request.cancel_at_period_end ? "canceled" : request.status,
        ends: request.current_period_end
      }
    }

    Meteor.call('updateUserSubscription', update, function(error, response){
      if (error){
        console.log(error);
      }
    });
  }
}

stripeCreateInvoice = function(request) {
  var getUser = Meteor.users.findOne({"subscription.stripeId": request.customer}, {fields: {"_id": 1, "emails": 1, "subscription.country_data": 1}});

  if (getUser){
    var invoiceItem = request.lines.data[0];
    var tax_percent = request.tax_percent;
    var tax = request.tax;
    var subtotal = request.subtotal;
    var total = request.total;

    var user_country = getUser.subscription.country_data.user_country;
    var card_country = getUser.subscription.country_data.card_country;
    var ip_country = getUser.subscription.country_data.ip_country;

    if(total > 0) {
      //Setup an invoice object.
      var invoice = {
        owner: getUser._id,
        sellerId: '8910054850',
        sellerName: 'Firma Gustav Larsson',
        email: getUser.emails[0].address,
        createdAt: new Date(),
        date: request.date,
        planId: invoiceItem.plan.id,
        ends: invoiceItem.period.end,
        country_data: {
          user_country: user_country,
          card_country: card_country,
          ip_country: ip_country
        },
        subtotal: subtotal,
        tax_percent: tax_percent,
        tax: tax,
        total: total
      }

      Invoices.insert(invoice, function(error, response){
        if (error) {
          console.log(error);
        }
      });
    }
  }
}
