Template.invoice.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleInvoice', id);
  });
});

Template.invoice.helpers({
  invoice: ()=> {
    var id = FlowRouter.getParam('id');
    return Invoices.findOne({_id: id});
  },
  inDollars: function(amount){
    return (amount/100);
  }
});
