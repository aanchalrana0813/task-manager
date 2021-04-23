// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn= document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Load all even listeners 
function  loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task events
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks events
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
 function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
tasks = [];
  }else{
    tasks = JASON.parse(localStorage.getItem('tasks'));
  }

      tasks.forEach(function(task){

    // Create li element
    const li= document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create text node and append to
    li.appendChild(document.createTextNode(task));
    // Create new element
    const link =  document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-ban"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
      });
    }

//Add Task
function addTask(e) {
 if(taskInput.value === ''){
   alert('Add a Task')
 }
// Create li element
const li= document.createElement('li');
//Add Class
li.className = 'collection-item';
// Create text node and append to
li.appendChild(document.createTextNode(taskInput.value));
// Create new element
const link =  document.createElement('a');
// Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class="fas fa-ban"></i>';
// Append the link to li
li.appendChild(link);

// Append li to ul
taskList.appendChild(li);

// Store in Local Storage
storeTaskInLocalStorage(taskInput.value);

// Clear input
taskInput.value = '';

  e.preventDefault();
}

//Store task

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
tasks = [];
  }else{
    tasks = JASON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
}



//Remove Task

  function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
  //console.log(e.target);
      if(confirm('Are you Sure?')){
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }

  //Remove from LS
  function removeTaskFromLocalStorage(taskItem){
    let tasks;
  if(localStorage.getItem('tasks') === null){
tasks = [];
  }else{
    tasks = JASON.parse(localStorage.getItem('tasks'));
  }
   tasks.forEach(function(task , index){
     if(taskItem.textContent === task){
       tasks.splice(index, 1);
     }
   });
    //console.log(taskItem);
    localStorage.setItems('tasks', JSON.stringify(tasks));
  }

  //Clear Task
  function clearTasks(){
    //taskList.innerHTML ='';
  

  //Faster
 while(taskList.firstChild) {
  taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

//Clear taks from local storage

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }

  });

  //console.log(text);
}