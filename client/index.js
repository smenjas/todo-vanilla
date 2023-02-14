function addTask(task, taskID) {
    task = task.trim();
    taskID = parseInt(taskID);

    if (task === '') {
        return false;
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTask(taskList, task, taskID);

    return true;
}

function deleteTask(tasks, taskID) {
    tasks.splice(taskID, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
}

function showTask(taskList, task, taskID) {
    const button = document.createElement('button');
    //button.innerHTML = '❌';
    button.innerHTML = '🗑️';
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'delete');
    button.setAttribute('title', 'Delete Task');
    button.setAttribute('id', `delete-${taskID}`);
    button.addEventListener('click', event => {
        const taskID = event.target.id.split('-')[1];
        tasks = deleteTask(tasks, taskID);
        showTasks(taskList, tasks);
    });

    const li = document.createElement('li');
    li.append(button, ' ', task);
    li.setAttribute('id', `task-${taskID}`);

    taskList.appendChild(li);
}

function showTasks(taskList, tasks) {
    taskList.innerHTML = '';
    tasks.forEach((task, taskID) => {
        showTask(taskList, task, taskID);
    });
}

const form = document.querySelector('form');
const newTask = document.getElementById('new-task');
const taskList = document.getElementById('tasks');

//localStorage.setItem('tasks', '[]'); // Clear all tasks.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

form.onsubmit = (event) => {
    event.preventDefault();
    addTask(newTask.value, tasks.length);
    newTask.value = '';
}

showTasks(taskList, tasks);
