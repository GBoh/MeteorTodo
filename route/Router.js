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
  template: 'listPage',
  data: function() {
    var currentId = this.params._id;
    return Lists.findOne({
      _id: currentId
    });
  }
});
