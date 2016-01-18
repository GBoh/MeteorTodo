Template.addTodo.events({
  "submit form": function(event) {
    event.preventDefault();
    var todoName = $('[name="todoName"]').val();
    var currentList = this._id;
    Meteor.call('insertTodoData', todoName, currentList);
    $('[name=todoName]').val('');
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
    var documentId = this._id;
    var todoItem = $(event.target).val();
    Meteor.call('updateTodoData', documentId, todoItem);
    if (event.which === 13 || event.which === 27) {
      $(event.target).blur();
    }
  },
  'click [type=checkbox]': function() {
    var documentId = this._id;
    var isCompleted = this.completed;
    if (isCompleted) {
      Meteor.call('changeItemStatus', documentId, false);
      console.log('checked');
    } else {
      Meteor.call('changeItemStatus', documentId, true);
      console.log('unchecked');
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
      }
    });
    $('[name=listName]').val('');
  }
});

//registration
Template.register.events({
  "submit form": function(event) {
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      email: email,
      password: password
    });
    Router.go('home');
  }
});

Template.navigation.events({
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.login.events({
  "submit form": function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log(error);
      }else{
        var currentRoute = Router.current().route.getName();
        if(currentRoute === 'login'){
          Router.go('home');
        }
      }
    });
  }
});
