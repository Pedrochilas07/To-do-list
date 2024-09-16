import "./styles/index.css"
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const excludeBtn = document.getElementById('excludeBtn');
const alertText = document.getElementById('alertText');
const alertRemove = document.getElementById('alertRemove');

function clearAlerts() {
    alertText.innerHTML = '';
    alertRemove.innerHTML = '';
}
function addTask() {  
    const taskText = taskInput.value.trim();

    clearAlerts();

    if (taskText === '') {
        const alertLi = document.createElement('li');
        alertLi.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <span class="alertSpan">Please enter a task.</span>`;
        alertText.innerHTML = '';
        alertText.appendChild(alertLi);
        return;
    }
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox" class="task-checkbox">    
        <span class="checktask">${taskText}</span>
    `;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.color = "green";
        } else {
            label.style.color = "black";
        }
    });
});

    taskList.appendChild(newTask);
    taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

function removeTask() {
    const removedTasks = [];
    const checkboxes = document.querySelectorAll('#taskList .task-checkbox');

    clearAlerts();
    let taskRemoved = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            taskRemoved = true;
            const listItem = checkbox.parentElement;
            const taskText = listItem.querySelector('.checktask').textContent;

            removedTasks.push(taskText);
            taskList.removeChild(listItem);
            console.log(`Removing task: ${taskText}`);
        }
    });

    if (taskRemoved) {
        console.log('Tasks removed:', removedTasks);
    } else {
        console.log('No tasks were removed');

        const notRemoved = document.createElement('li');
        notRemoved.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <span class="spanRemove">No task was removed.</span>`;
        alertRemove.innerHTML = '';
        alertRemove.appendChild(notRemoved);
    }
}

excludeBtn.addEventListener('click', removeTask);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        console.log('Delete key pressed');
        if (document.activeElement !== taskInput) {
            removeTask();
        }
    }
})