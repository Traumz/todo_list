// SELECTEURS

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// ECOUTEURS

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// FONCTIONS 

function addTodo(event) {
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Ajouter la todo au localStorage
    saveLocalTodo(todoInput.value);

    // Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("complete-button");
    todoDiv.appendChild(checkButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    // Ajouter to do à la liste
    todoList.appendChild(todoDiv);
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target;
    // DELETE
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
} 

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
            break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;                
        }
    })
}

function saveLocalTodo(todo) {
    //Check si il y a des items existants
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Créer le li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = "<i class='fas fa-check'></i>";
        checkButton.classList.add("complete-button");
        todoDiv.appendChild(checkButton);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        // Ajouter to do à la liste
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}