// Selectors
// Get the elements that we want to manipulate
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".todo-filter");

// Event Listeners
// Update the UI when the DOM content is loaded
document.addEventListener('DOMContentLoaded', getTodos);
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

// This deletion functionality is not deleting from the local storage
function deleteCheck(event) {
    // Grab the icon that we're clicking on
    const item = event.target;

    // Deleting
    if (item.classList[0] === "trash-btn"){
        // Deleting the parent element of the element that we're clicking on
        // Adding transition before deleting
        const itemToDelete = item.parentElement;
        itemToDelete.classList.add("fall");

        // Call the deletion function
        removeTodoFromStorage(itemToDelete);

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

// Checking if the local storage contains data (A function with repetitive usage)
function checkLocalStorage() {
    let todos;
    // CHECK --- HEY Do I already have things here?
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// Adding todos to local storage
function saveToLocalStorage(todo) {
    
    let storageTodos = checkLocalStorage();
    // Add the new todo that we created to the list
    storageTodos.push(todo);
    // Stringify the todos to save it to the local storage
    localStorage.setItem("todos", JSON.stringify(storageTodos));
}

// A function to render the todos item on the screen to be able to retain the items when we close and reopen the app
function getTodos() {
    // Check the storage
    let storageTodos = checkLocalStorage();
 
   // Loop through the todos in the storage 
   // The function take each todo in the local storage to loop over it and then pass it to the inner text of the newTodo
   storageTodos.forEach(function(todo){
        // Create the todo items
        // 1. the Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        // 2. the li
        const newTodo = document.createElement('li');
        newTodo.classList.add("todo-item");
        // Updating the inner text (using the local storage)
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        // 3. the add buttons of the todo item
        const completedButton = document.createElement('button');
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = '<li class="fas fa-check"></li>';
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<li class="fas fa-trash"></li>';
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
   })
}

// Delete from the local storage
function removeTodoFromStorage(todo) {
    // To delete, we first check the storage
    let savedTodos = checkLocalStorage();

    // Second get the index of the item and delete it
    let todoIndex = todo.children[0].innerText;
    savedTodos.splice(todoIndex.indexOf(todoIndex, 1));

    // Set it back to the storage
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}