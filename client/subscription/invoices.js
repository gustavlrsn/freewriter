Template.invoices.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('invoices');
  });
});

Template.invoices.helpers({
  invoices: ()=> {
    return Invoices.find({}, {sort: {createdAt: -1}});
  },
  inDollars: function(amount){
    return (amount/100);
  }
});
