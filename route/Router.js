Router.configure({
  layoutTemplate: "main",
  loadingTemplate: 'loading'
});

Router.route("/register");

Router.route("/login");

Router.route('/', {
  name: 'home',
  template: 'home',
  waitOn: function(){
    return Meteor.subscribe("lists");
  }
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
  waitOn: function() {
    var currentList = this.params._id;
    return [Meteor.subscribe("lists"),
            Meteor.subscribe("todos", currentList)];
  }
});
