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
