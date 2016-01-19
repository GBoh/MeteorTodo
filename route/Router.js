Router.configure({
  layoutTemplate: "main"
});

Router.route("/register");

Router.route("/login");

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/list/:_id', {
  name: 'listPage',
  template: 'listPage',
  data: function() {
    var currentId = this.params._id;
    return Lists.findOne({
      _id: currentId
    });
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      this.render('login');
    }
  },
  subscriptions: function() {
    var currentList = this.params._id;
    return Meteor.subscribe("todos", currentList);
  }
});
