Template.todos.helpers({
  'todo': function() {
    var currentList = this._id;
    return Todos.find({
      listId: currentList,
      completed: false
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  'todoComplete': function() {
    var currentList = this._id;
    return Todos.find({
      listId: currentList,
      completed: true
    });
  }
});

Template.todoItem.helpers({
  'checked': function() {
    var isCompleted = this.completed;
    if (isCompleted) {
      return 'checked';
    } else {
      return '';
    }
  }
});

Template.todosCount.helpers({
  'totalTodos': function() {
    return Todos.find().count();
  },
  'completeTodos': function() {
    return Todos.find({
      completed: true
    }).count();
  }
});

Template.lists.helpers({
  'list': function() {
    return Lists.find({}, {
      sort: {
        name: 1
      }
    });
  }
});
