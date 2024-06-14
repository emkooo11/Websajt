document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');
    const filters = document.getElementById('filters');

    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    filters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter')) {
            document.querySelector('.filter.active').classList.remove('active');
            e.target.classList.add('active');
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('complete-btn')) {
            const index = target.parentElement.parentElement.dataset.index;
            tasks[index].completed = !tasks[index].completed;
        } else if (target.classList.contains('delete-btn')) {
            const index = target.parentElement.parentElement.dataset.index;
            tasks.splice(index, 1);
        }
        renderTasks();
    });

    function renderTasks() {
        const filter = document.querySelector('.filter.active').dataset.filter;
        taskList.innerHTML = '';
        tasks
            .filter(task => {
                if (filter === 'all') return true;
                return filter === 'completed' ? task.completed : !task.completed;
            })
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.dataset.index = index;
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="actions">
                        <button class="complete-btn"><i class="fas fa-check"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    }
});
