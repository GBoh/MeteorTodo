Meteor.publish("todosList", function() {
  var currentUser = this.userId;
  return Todos.find({
    createdBy: currentUser
  });
});

Meteor.publish("listsList", function() {
  var currentUser = this.userId;
  return Lists.find({
    createdBy: currentUser
  });
});
