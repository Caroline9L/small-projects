var todoList = {
	todos: [],
	addTodo: function (todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function (index, todoText) {
		this.todos[index].todoText = todoText;
	},
	deleteTodo: function (index) {
		this.todos.splice(index, 1);
	},
	toggleCompleted: function (index) {
		var todo = this.todos[index];
		todo.completed = !todo.completed;
	},
	toggleAll: function () {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		// for (var i = 0; i < this.todos.length; i++) {
		// 	if (this.todos[i].completed === true) {
		// 		completedTodos++;
		// 	}
		// }

		this.todos.forEach(function(todo) {//pass in the array so you don't have to get into the this.etc
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		if (completedTodos === totalTodos) {
			// for (var i = 0; i < totalTodos; i++) {
			// 	this.todos[i].completed = false;
			this.todos.forEach(function(todo) {
				todo.completed = false;
			});
		} else {
			// for (var i = 0; i < totalTodos; i++) {
			// 	this.todos[i].completed = true;
			this.todos.forEach(function(todo) {
				todo.completed = true;
			});
		}
	}
};


var handlers = {
	addTodo: function () {
		var addTodo = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeTodo: function () {
		var changeTodoIndex = document.getElementById('changeTodoIndex');
		var changeTodoText = document.getElementById('changeTodoText');
		todoList.changeTodo(changeTodoIndex.valueAsNumber, changeTodoText.value);
		changeTodoText.value = '';
		changeTodoIndex.value = '';
		view.displayTodos();
	},
	deleteTodo: function (index) {
		// var deleteTodoIndex = document.getElementById('deleteTodoIndex');
		// todoList.deleteTodo(deleteTodoIndex.valueAsNumber);
		todoList.deleteTodo(index);
		// deleteTodoIndex.value = '';
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

			todoLi.id = i;
			todoLi.textContent = todoTextComplete;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');

		todosUl.addEventListener('click', function (e) {
			// console.log(event.target.parentNode.id);
			var elementClicked = event.target;
			if (elementClicked.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(event.target.parentNode.id));
			}
		});
	}
};

view.setUpEventListeners();

// var todosUl = document.querySelector('ul');
// todosUl.addEventListener('click', function(e) {
// 	// console.log(event.target.parentNode.id);
// 	var elementClicked = event.target;
// 	if (elementClicked.className === 'deleteButton') {
// 		handlers.deleteTodo(parseInt(event.target.parentNode.id));
// 	}
// });

