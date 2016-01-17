Meteor.publish("todosList", function() {
  return Todos.find({});
});

Meteor.publish("listsList", function() {
  return Lists.find({});
});
