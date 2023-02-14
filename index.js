function addTask(tasks, taskID, task) {
    task = task.trim();
    taskID = parseInt(taskID);

    if (task === '') {
        return false;
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return true;
}

function deleteTask(tasks, taskID) {
    tasks.splice(taskID, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
}

function showTask(taskList, tasks, task, taskID) {
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
        showTasks(tasks);
    });

    const li = document.createElement('li');
    li.append(button, ' ', task);
    li.setAttribute('id', `task-${taskID}`);

    taskList.appendChild(li);
}

function showNewTask(taskList) {
    const button = document.createElement('button');
    button.innerHTML = 'Add Task';
    button.setAttribute('type', 'submit');

    const input = document.createElement('input');
    input.setAttribute('name', 'new-task');
    input.setAttribute('id', 'new-task');

    const li = document.createElement('li');
    li.append(input, ' ', button);

    taskList.appendChild(li);
}

function showTasks(tasks) {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    showNewTask(taskList);
    for (let taskID = tasks.length - 1; taskID > -1; taskID--) {
        showTask(taskList, tasks, tasks[taskID], taskID);
    }
    document.getElementById('new-task').focus();
}

//localStorage.setItem('tasks', '[]'); // Clear all tasks.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

showTasks(tasks);

const form = document.querySelector('form');
form.onsubmit = (event) => {
    event.preventDefault();
    const newTask = document.getElementById('new-task');
    addTask(tasks, tasks.length, newTask.value);
    newTask.value = '';
    showTasks(tasks);
}
