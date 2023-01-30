function isLocalStorageSupported() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch (error) {
        return false;
    }
}

localStorageSupported = isLocalStorageSupported();
console.log(`Local storage is${localStorageSupported ? '' : ' NOT'} supported.`);

const tasks = [];

let list = '';
for (const task in tasks) {
    const text = tasks[task];
    console.log(task, text);
    list += `<li><input type="text" size="80" maxsize="160" name="task-${task}" id="task-${task}" value="${text}"></li>`;
}

list += `<li><input type="text" size="80" maxsize="160" name="task-new" id="task-new" value=""></li>`;

let content = '<div class="todo">'
content += '<form action="" method="post">';
content += '<fieldset>';
content += `<ul class="tasks">${list}</ul>`;
content += '<button type="submit">Submit</button>';
content += '</fieldset>';
content += '</form>'
content += '</div>'

document.body.insertAdjacentHTML('beforeend', content);
