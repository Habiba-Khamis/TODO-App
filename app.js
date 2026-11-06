// Selectors
// Get the elements that we want to manipulate
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".todo-filter");

// Event Listeners
// Adding clicking event to the button
todoButton.addEventListener('click', addTodo);
// Adding deletion functionality
todoList.addEventListener('click', deleteCheck);
// Adding filter functionality
filterOptions.addEventListener('click', filterTodo);

// Functions
// A function to add a new todo item
function addTodo(event) {
    // Preventing the browser from submitting
    event.preventDefault();

    // Creating the div of the todo item
    const todoDiv = document.createElement('div');
    // Add a class to it
    todoDiv.classList.add("todo");

    // Create the todo item
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    // Change the content of it to have the value of the text input
    newTodo.innerText = todoInput.value;
    // Add the todo to the todoDiv
    todoDiv.appendChild(newTodo);

    // Add to the local storage and before we clear up the todo input value
    saveToLocalStorage(todoInput.value);

    // The completed button
    const completedButton = document.createElement('button');
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    todoDiv.appendChild(completedButton);
    
    // The trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML= '<li class="fas fa-trash"></li>';
    todoDiv.appendChild(trashButton);

    // Add them to the <ul> element so they don't float under the todo-container
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value= '';
}

function deleteCheck(event) {
    // Grab the icon that we're clicking on
    const item = event.target;

    // Deleting
    if (item.classList[0] === "trash-btn"){
        // Deleting the parent element of the element that we're clicking on
        // Adding transition before deleting
        const itemToDelete = item.parentElement;
        itemToDelete.classList.add("fall");

        // It wait until the transition ends then it execute the function
        todoList.addEventListener('transitionend', function(){
            itemToDelete.remove()
        })
    }

    // Click the check mark to mark as completed
    if (item.classList[0] === "complete-btn"){
        const itemToCheck = item.parentElement;
        itemToCheck.classList.toggle("completed");
    }
}

// Function to filter the select menu option
function filterTodo(event) {
    // Grab all todos from the list
    const todos = Array.from(todoList.children);
    // Loop through the list using `forEach` because we're using the nodes
    todos.forEach(function(todo) {
        switch (event.target.value) {
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
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } 
                break;
        }   
    })
}
// Adding todos to local storage
function saveToLocalStorage(todo) {
    let todos;
    // CHECK --- HEY Do I already have things here?
    if (localStorage.getItem("todos") === null ){
        todos = [];
    } else {
        // If not empty show them after parsing them to an array
        todos = localStorage.getItem(JSON.parse("todos"));
    }

    // Add the new todo that we created to the list
    todos.push(todo);
    // Stringify the todos to save it to the local storage
    localStorage.setItem(JSON.stringify(todos), todo);
}