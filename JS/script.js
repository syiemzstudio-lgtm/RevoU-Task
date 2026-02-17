document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const filterSelect = document.getElementById('filter-select');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const emptyMsg = document.getElementById('empty-msg');

    let todos = [];

    
    const renderTodos = (filter = 'all') => {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (filter === 'pending') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });

        if (filteredTodos.length === 0) {
            emptyMsg.style.display = 'block';
        } else {
            emptyMsg.style.display = 'none';
            filteredTodos.forEach((todo, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${todo.task}</td>
                    <td>${todo.date}</td>
                    <td>
                        <span class="status-badge ${todo.completed ? 'completed' : 'pending'}" 
                              onclick="toggleStatus(${todo.id})">
                            ${todo.completed ? 'Completed' : 'Pending'}
                        </span>
                    </td>
                    <td>
                        <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
                    </td>
                `;
                todoList.appendChild(tr);
            });
        }
    };

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        if (taskInput.value.trim() === '' || dateInput.value === '') {
            alert('Please fill in all fields');
            return;
        }

        const newTodo = {
            id: Date.now(),
            task: taskInput.value,
            date: dateInput.value,
            completed: false
        };

        todos.push(newTodo);
        form.reset();
        renderTodos(filterSelect.value);
    });

    
    window.toggleStatus = (id) => {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderTodos(filterSelect.value);
    };

    
    window.deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(filterSelect.value);
    };

    
    filterSelect.addEventListener('change', (e) => {
        renderTodos(e.target.value);
    });

    
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            todos = [];
            renderTodos();
        }
    });
});