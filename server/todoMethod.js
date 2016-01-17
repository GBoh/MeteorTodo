Meteor.methods({
  'insertTodoData': function(todoName, currentList) {
    if (todoName) {
      Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date(),
        listId : currentList
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
    return Lists.insert({
        name: listName
      });
    }
  }
});
