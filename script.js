const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
taskForm.addEventListener('submit', function(e) {
   e.preventDefault();
   addTask(taskInput.value);
   taskInput.value = '';
});

// Task events (complete/delete)
taskList.addEventListener('click', function(e) {
   if (e.target.tagName === 'LI') {
      e.target.classList.toggle('completed');
      saveTasks();
   } else if (e.target.classList.contains('delete-btn')) {
      e.target.parentElement.remove();
      saveTasks();
   }
});

// Dark mode toggle
darkModeToggle.addEventListener('click', function() {
   document.body.classList.toggle('dark-mode');
});

// Functions

function addTask(task) {
   const li = document.createElement('li');
   li.textContent = task;

   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = '✖';
   deleteBtn.classList.add('delete-btn');
   
   li.appendChild(deleteBtn);
   taskList.appendChild(li);
   
   saveTasks();
}

function saveTasks() {
   const tasks = [];
   document.querySelectorAll('#task-list li').forEach(task => {
      tasks.push({
         text: task.firstChild.textContent,
         completed: task.classList.contains('completed')
      });
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;

      if (task.completed) {
         li.classList.add('completed');
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✖';
      deleteBtn.classList.add('delete-btn');

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
   });
}
