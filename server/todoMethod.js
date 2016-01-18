Meteor.methods({
  'insertTodoData': function(todoName, currentList) {
    if (todoName) {
      var currentUser = Meteor.userId();
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date(),
        createdBy: currentUser,
        listId: currentList
      });
    }
  },
  'removeTodoData': function(id) {
    Todos.remove({
      _id: id
    });
  },
  'updateTodoData': function(id, task, complete) {
    Todos.update({
      _id: id
    }, {
      $set: {
        name: task
      }
    });
  },
  'changeItemStatus': function(id, status) {
    Todos.update({
      _id: id
    }, {
      $set: {
        completed: status
      }
    });
  },
  'insertListData': function(listName) {
    if (listName) {
      var currentUser = Meteor.userId();
      var data = {
        name: listName,
        createBy: currentUser
      };
      return Lists.insert(data);
    }
  }
});
