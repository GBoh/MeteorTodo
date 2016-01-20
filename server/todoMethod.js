Meteor.methods({
  'insertTodoData': function(todoName, currentList) {
    check(todoName, String);
    check(currentList, String);
    var currentUser = Meteor.userId();
    var currList = Lists.findOne(currentList);

    if (currList.createdBy != currentUser) {
      throw new Meter.Error('invalid-user', 'You are not permitted to edit that list');
    }
    if (!currentUser) {
      throw new Meteor.Error('not-logged-in', 'You are not logged in');
    }
    var data = {
      name: todoName,
      completed: false,
      createdAt: new Date(),
      createdBy: currentUser,
      listId: currentList
    };
    return Todos.insert(data);
  },
  'removeTodoData': function(id) {
    if(!currentUser){
      throw new Meteor.Error('not-logged-in', 'You are not logged in');
    }
    Todos.remove({
      _id: id
    });
  },
  'updateTodoData': function(id, task) {
    var currentUser = Meteor.userId();
    if(!currentUser){
      throw new Meteor.Error('not-logged-in', 'You are not logged in');
    }
    check(task, String);

    Todos.update({
      _id: id
    }, {
      $set: {
        name: task
      }
    });
  },
  'changeItemStatus': function(id, status) {
    var currentUser = Meteor.userId();
    if(!currentUser){
      throw new Meteor.Error('not-logged-in', 'You are not logged in');
    }
    check(status, Boolean);

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

      check(listName, String);
      if (listName === '') {
        listName = deafultName(currentUser);
      }

      var data = {
        name: listName,
        createdBy: currentUser
      };
      if (!currentUser) {
        throw new Meteor.Error('not-logged-in', 'You are not logged in');
      }
      return Lists.insert(data);
    }
  },
  'removeList' : function(id){
    var currentUser = Meteor.userId();
    if(!currentUser){
      throw new Meteor.Error('not-logged-in', 'You are not logged in');
    }
    var data = {
      _id: id
    };
    Todos.remove({listId: id});
    console.log(Todos.find().count());
    return Lists.remove(data);
  }
});

function deafultName(currentUser) {
  var nextLetter = 'A';
  var nextName = 'List ' + nextLetter;
  while (Lists.findOne({
      name: nextName,
      createdBy: currentUser
    })) {
    nextLetter = String.ffromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }
  return nextName;
}
