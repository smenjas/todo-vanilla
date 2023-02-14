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

function showTask(taskList, task, taskID) {
    const li = document.createElement('li');
    li.innerHTML = task;
    li.setAttribute('id', `task-${taskID}`);
    taskList.appendChild(li);
}

const form = document.querySelector('form');
const newTask = document.getElementById('new-task');
const taskList = document.getElementById('tasks');

//localStorage.setItem('tasks', '[]'); // Clear all tasks.
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

form.onsubmit = (event) => {
    event.preventDefault();
    addTask(newTask.value, tasks.length);
    newTask.value = '';
}

tasks.forEach((task, taskID) => {
    showTask(taskList, task, taskID);
});
