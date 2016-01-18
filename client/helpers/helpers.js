Template.todos.helpers({
  'todo': function() {
    var currentList = this._id;
    var currentUser = Meteor.userId();
    return Todos.find({
      listId: currentList,
      completed: false,
      createdBy: currentUser
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  'todoComplete': function() {
    var currentList = this._id;
    var currentUser = Meteor.userId();
    return Todos.find({
      listId: currentList,
      completed: true,
      createdBy: currentUser
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
    var currentList = this._id;
    var currentUser = Meteor.userId();
    return Todos.find({
      listId: currentList,
      createdBy: currentUser
    }).count();
  },
  'completeTodos': function() {
    var currentList = this._id;
    var currentUser = Meteor.userId();
    return Todos.find({
      listId: currentList,
      createdBy: currentUser,
      completed: true
    }).count();
  }
});

Template.lists.helpers({
  'list': function() {
    var currentUser = Meteor.userId();
    return Lists.find({
      createdBy: currentUser
    }, {
      sort: {
        name: 1
      }
    });
  }
});
