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
  },
  formatDate: function(value) {
    return moment.unix(value).format("YYYY-MM-DD");
  }
});
