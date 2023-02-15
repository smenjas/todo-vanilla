class TaskList {
    static inputSize = 70;
    static maxLength = 70;

    constructor() {
        //localStorage.setItem('tasks', '[]'); // Clear all tasks.
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.showTasks();
        this.processForm();
        return this;
    }

    addTask(task) {
        task = task.trim();
        if (task === '') {
            return false;
        }

        task = task.substring(0, TaskList.maxLength);
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return true;
    }

    updateTask(taskID, task) {
        taskID = parseInt(taskID);
        if (!(taskID in this.tasks)) {
            return false;
        }

        task = task.trim();
        task = task.substring(0, TaskList.maxLength);
        if (task === this.tasks[taskID]) {
            return false;
        }

        if (task === '') {
            this.deleteTask(taskID);
            return true;
        }

        this.tasks[taskID] = task;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return true;
    }

    deleteTask(taskID) {
        taskID = parseInt(taskID);
        if (!(taskID in this.tasks)) {
            return false;
        }

        this.tasks.splice(taskID, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        return true;
    }

    showTask(taskList, task, taskID) {
        const button = document.createElement('button');
        //button.innerHTML = '❌';
        button.innerHTML = '🗑️';
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'delete');
        button.setAttribute('title', 'Delete Task');
        button.setAttribute('id', `delete-${taskID}`);
        button.addEventListener('click', event => {
            const taskID = event.target.id.split('-')[1];
            this.deleteTask(taskID);
            this.showTasks();
        });

        const input = document.createElement('input');
        input.setAttribute('name', `task-${taskID}`);
        input.setAttribute('id', `task-${taskID}`);
        input.setAttribute('size', TaskList.inputSize);
        input.setAttribute('maxlength', TaskList.maxLength);
        input.setAttribute('value', task);

        const li = document.createElement('li');
        li.append(input, button);

        taskList.appendChild(li);
    }

    showNewTask(taskList) {
        const button = document.createElement('button');
        button.innerHTML = '&#10133;';
        button.setAttribute('type', 'submit');
        button.setAttribute('title', 'Add Task');

        const input = document.createElement('input');
        input.setAttribute('name', 'new-task');
        input.setAttribute('id', 'new-task');
        input.setAttribute('size', TaskList.inputSize);
        input.setAttribute('maxlength', TaskList.maxLength);

        const li = document.createElement('li');
        li.append(input, button);

        taskList.appendChild(li);
    }

    showTasks() {
        const taskList = document.querySelector('#tasks ul');
        taskList.innerHTML = '';
        this.showNewTask(taskList);
        for (let taskID = this.tasks.length - 1; taskID > -1; taskID--) {
            this.showTask(taskList, this.tasks[taskID], taskID);
        }
        document.getElementById('new-task').focus();
    }

    processForm() {
        document.querySelector('form#tasks').onsubmit = event => {
            event.preventDefault();
            document.querySelectorAll('input').forEach(input => {
                if (input.id === 'new-task') {
                    this.addTask(input.value);
                    input.value = '';
                } else {
                    const taskID = input.id.split('-')[1];
                    this.updateTask(taskID, input.value);
                }
                this.showTasks();
            });
        }
    }
}

const taskList = new TaskList();
