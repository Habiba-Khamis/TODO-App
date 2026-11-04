// Selectors
// Get the elements that we want to manipulate
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
// Adding clicking event to the button
todoButton.addEventListener('click', addTodo);
// Adding deletion functionality
todoButton.addEventListener('click', deleteCheck);

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

