// DOM
const addTodo = document.querySelector(".add");
const Todolist = document.querySelector(".list");
const err = document.querySelector(".error");
let todos;

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
addTodo.addEventListener("click", addTodos);
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodos();
  }
});
// Functions

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    addHTML(todo);
  });
}

function addTodos() {
  const newTask = document.getElementById("task");
  if (newTask.value != "" || newTask.value != undefined) {
    if (!checkRedundancy(newTask.value)) {
      addHTML(newTask.value);
      saveLocalTodos(newTask.value);
      newTask.value = "";
    }
  }else{
    err.innerText = "Please enter your task first";
  }
}

function checkRedundancy(todo) {
  let i;
  for (i = 0; i < todos.length; i++) {
    if (todos[i].toLowerCase() == todo.toString().toLowerCase()) {
      break;
    }
  }
  if (i == todos.length) {
    return false;
  } else {
    if (confirm("Duplicate task! Do you want to add it anyway?")) {
      return false;
    } else {
      return true;
    }
  }
}

function addHTML(task) {
  Todolist.innerHTML += `
      <div class="todo">
        <li class="task-value">${task}</li>

        <button class="completed-btn" onclick="completedTodos(event)">
              <i class="fa fa-check fa-2x"></i>
        </button>

        <button class="delete-btn" onclick="deleteTodos(event)" >
              <i class="fa fa-trash-alt fa-2x"></i>
        </button>
          </div>
 `;
  err.innerText = "";
}

function deleteTodos(e) {
  e.preventDefault();
  const item = e.target;
  const todo = item.parentElement;
  todo.remove();
  removeLocalTodos(todo.children[0].innerText);
  }

function completedTodos(e) {
  e.preventDefault();
  const item = e.target;
  const todo = item.parentElement;
  console.log(todo);
  todo.classList.toggle("completed");

}

function saveLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function filterTodo(e){
//   const filters = e.target.children;
//   console.log(filters);

//   todos.forEach('todo',()=>{
//     switch(filters[index]){
//       case '1':
//         console.log('all');
//     }
//   })
 
// }
