Meteor.subscribe("todosList");

Meteor.subscribe("listsList");

// Template.todos.helpers({
//   'todo': function() {
//     return Todos.find({completed: false}, {
//       sort: {
//         //completed: 1,
//         createdAt: -1
//       }
//     });
//   },
//   'todoComplete':function(){
//     return Todos.find({completed:true});
//   }
// });
//
// Template.todoItem.helpers({
//   'checked': function() {
//     var isCompleted = this.completed;
//     if (isCompleted) {
//       return 'checked';
//     } else {
//       return '';
//     }
//   }
// });
//
// Template.todosCount.helpers({
//   'totalTodos': function() {
//     return Todos.find().count();
//   },
//   'completeTodos': function() {
//     return Todos.find({completed: true}).count();
//   }
// });

// Template.addTodo.events({
//   "submit form": function(event) {
//     event.preventDefault();
//     var todoName = $('[name="todoName"]').val();
//     Meteor.call('insertTodoData', todoName);
//     $('[name=todoName]').val('');
//   }
// });
//
// Template.todoItem.events({
//   'click .delete-todo': function(event) {
//     event.preventDefault();
//     var documentId = this._id;
//     var confirm = window.confirm("Delete this task?");
//     if (confirm) {
//       Meteor.call('removeTodoData', documentId);
//     }
//   },
//   'keyup [name=todoItem]': function(event) {
//     var documentId = this._id;
//     var todoItem = $(event.target).val();
//     Meteor.call('updateTodoData', documentId, todoItem);
//     if (event.which === 13 || event.which === 27) {
//       $(event.target).blur();
//     }
//   },
//   'click [type=checkbox]': function() {
//     var documentId = this._id;
//     var isCompleted = this.completed;
//     if (isCompleted) {
//       Meteor.call('changeItemStatus', documentId, false);
//       console.log('checked');
//     } else {
//       Meteor.call('changeItemStatus', documentId, true);
//       console.log('unchecked');
//     }
//   }
// });
//
// Template.addList.events({
//   "submit form": function(event){
//      event.preventDefault();
//      var listName= $('[name=listName]').val();
//      Lists.insert({
//        name:listName
//      });
//      $('[name=listName]').val('');
//   }
// });
