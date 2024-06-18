 // Define UI Vars
 const form =document.querySelector(`#task-form`);
 const taskList =document.querySelector(`.collection`);
 const clearBtn = document.querySelector(`.clear-task`);
 const filter = document.querySelector(`#filter`);
 const taskInput = document.querySelector(`#task`);

 //load all event listners
 loadEventListeners();

 //load all event listeners
 function loadEventListeners(){
  //DOM load event
   document.addEventListener('DOMContentLoaded', getTasks)
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  // CLear task event
  clearBtn.addEventListener('click', clearTasks)

  //filter tasks event
  filter.addEventListener('keyup', filterTask); 
 }

 //Get Tasks from Ls
 function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
   tasks =[];
  }else{
   tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      //create li element
  const li =document.createElement('li');

  //add class
li.className = 'collection-item';

//create text node and append to li
li.appendChild(document.createTextNode(task));

//Create new link element
const link = document.createElement('a');
// add class

link.className ='delete-item secondary-content';

//add icon html
  link.innerHTML ='<i class="fa fa-remove  "></i>';
  //append the link to li
   li.appendChild(link);

   //append li to ul
   taskList.appendChild(li);

  })
 }
 //add task
 function addTask(e){
  if (taskInput.value === ''){
    alert('add a task')
    
  }

  //create li element
  const li =document.createElement('li');

  //add class
li.className = 'collection-item';

//create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));

//Create new link element
const link = document.createElement('a');
// add class

link.className ='delete-item secondary-content';

//add icon html
  link.innerHTML ='<i class="fa fa-remove  "></i>';
  //append the link to li
   li.appendChild(link);

   //append li to ul
   taskList.appendChild(li);

   //Store in LS
   storeTaskInLocalStorage(taskInput.value);

   //clear input
  taskInput.value ='';
    
  e.preventDefault();
 }

 //Store Task
 function storeTaskInLocalStorage(task){
   let tasks;
   if (localStorage.getItem('tasks') === null) {
    tasks =[];
   }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 //Remove task
 function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
   
  }
 }

 //remove from Ls
 function removeTaskFromLocalStorage(taskItem){
 // console.log(taskItem);
  if (localStorage.getItem('tasks') === null) {
    tasks =[];
   }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1);
    }
   });

   localStorage.setItem('task', JSON.stringify(tasks));
 }
 //clear clear  task
 function clearTasks(){
  //taskList.innerHTML = '';

  //faster
 while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from Ls
   clearTaskFromLocalStorage(); 
 }

 //clear Tasks for LS
 function clearTaskFromLocalStorage(){
  localStorage.clear(); 
 }
 //filter Tasks
 function filterTask(e){
  const text = e.target.value.toLowerCase();
  //console.log(text)

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display ='block';
    }else{
      task.style.display ='none';
    }
  });
 }