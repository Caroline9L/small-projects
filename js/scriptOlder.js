var todoList = {
  todos: [],
  // displayTodos: function () {
  //   if (this.todos.length === 0) {
  //     console.log('Nothing to do!');
  //   } else {
  //     console.log('My Todos:');
  //     for (var i = 0; i < this.todos.length; i++) {
  //       // console.log(this.todos[i].todoText);
  //       if (this.todos[i].completed === true) {
  //         console.log('(x)', this.todos[i].todoText);
  //       } else {
  //         console.log('( )', this.todos[i].todoText);
  //       }
  //     }
  //   }
  // },
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText, //property: variable,
      completed: false
    });
    // this.displayTodos();
  },
  changeTodo: function (index, todoText) {
    // this.todos[index] = todoText;
    this.todos[index].todoText = todoText;//can do .xxx because it's an object property
    // this.displayTodos();
  },
  deleteTodo: function (index) {
    this.todos.splice(index, 1);
    // this.displayTodos();
  },
  toggleCompleted: function (index) {
    var todo = this.todos[index];
    todo.completed = !todo.completed;
    // this.displayTodos();
  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    // this.displayTodos();
  }
};

// var displayTodosButton = document.getElementById('display');

// displayTodosButton.addEventListener('click', function () {
//   todoList.displayTodos();
// });

// var toggleAllButton = document.getElementById('toggle');

// toggleAllButton.addEventListener('click', function () {
//   todoList.toggleAll();
// });

var handlers = {
  // displayTodos: function () {
  //   todoList.displayTodos();
  // },
  addTodo: function() {
    var addTodo = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoIndex = document.getElementById('changeTodoIndex');
    var changeTodoText = document.getElementById('changeTodoText'); 
    todoList.changeTodo(changeTodoIndex.valueAsNumber, changeTodoText.value);
    changeTodoText.value = '';
    changeTodoIndex.value = '';
    view.displayTodos();
  },
  deleteTodo: function() {
    var deleteTodoIndex = document.getElementById('deleteTodoIndex');
    todoList.deleteTodo(deleteTodoIndex.valueAsNumber);
    deleteTodoIndex.value = '';
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedIndex = document.getElementById('toggleCompletedIndex');
    todoList.toggleCompleted(toggleCompletedIndex.valueAsNumber);
    toggleCompletedIndex.value = '';
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextComplete = '';

      if (todo.completed === true) {
        todoTextComplete = '(x) ' + todo.todoText;
      } else {
        todoTextComplete = '( ) ' + todo.todoText;
      }

      todoLi.textContent = todoTextComplete;
      // todoLi.textContent = todoList.todos[i].todoText; //is replaced by line above
      todosUl.appendChild(todoLi);
    }
  }
};

