Template.addTodo.events({
  "submit form": function(event) {
    event.preventDefault();
    var todoName = $('[name="todoName"]').val();
    var currentList = this._id;
    Meteor.call('insertTodoData', todoName, currentList, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        $('[name=todoName]').val('');
      }
    });
  }
});

Template.todoItem.events({
  'click .delete-todo': function(event) {
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this task?");
    if (confirm) {
      Meteor.call('removeTodoData', documentId);
    }
  },
  'keyup [name=todoItem]': function(event) {
    if (event.which === 13 || event.which === 27) {
      $(event.target).blur();
    } else {
      var documentId = this._id;
      var todoItem = $(event.target).val();
      Meteor.call('updateTodoData', documentId, todoItem);
    }
  },
  'click [type=checkbox]': function() {
    var documentId = this._id;
    var isCompleted = this.completed;
    if (isCompleted) {
      Meteor.call('changeItemStatus', documentId, false);
    } else {
      Meteor.call('changeItemStatus', documentId, true);
    }
  }
});

Template.addList.events({
  "submit form": function(event) {
    event.preventDefault();
    var listName = $('[name=listName]').val();
    Meteor.call("insertListData", listName, function(error, result) {
      if (error) {
        console.log("error", error.reason);
      }
      if (result) {
        Router.go('listPage', {
          _id: result
        });
        $('[name=listName]').val('');

      }
    });
  }
});


Template.lists.events({
  'click .delete': function(event){
    event.preventDefault();
    var documentId = this._id;
    console.log(documentId);
    Meteor.call("removeList", documentId, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Router.go('home');
      }
    });
  }
});

Template.navigation.events({
  "click .logout": function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

//registration
Template.register.events({
  "submit form": function(event) {
    event.preventDefault();
  }
});

Template.register.onRendered(function() {
  var validator = $('.register').validate({
    submitHandler: function(event) {
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var general = $('#generalError');

      Accounts.createUser({
        email: email,
        password: password
      }, function(error) {
        if (error) {
          validator.showErrors({
            email: error.reason
          });
        } else {
          Router.go('home');
        }
      });
    }
  });
});

///login
Template.login.events({
  "submit form": function(event) {
    event.preventDefault();
  }
});

Template.login.onRendered(function() {
  var validator = $('.login').validate({
    submitHandler: function(event) {
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var general = $('#generalError');

      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          general.append('Invalid username or password').addClass('error');
        } else {
          var currentRoute = Router.current().route.getName();
          if (currentRoute === 'login') {
            Router.go('home');
          }
        }
      });
    }
  });
});


$.validator.setDefaults({
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    }
  },
  messages: {
    email: {
      required: 'You must enter an email address',
      email: 'You\'ve entered an invalid email address'
    },
    password: {
      required: 'You must enter a password',
      minlength: 'Your password must be at least {0} characters'
    }
  },
  errorPlacement: function(error, element) {
    if (element.attr('name') === 'email') {
      error.appendTo('#emailErrors');
    }

    if (element.attr('name') === 'password') {
      error.appendTo('#passwordErrors');
    }
  }
});
