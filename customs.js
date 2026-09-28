const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const clearBtn = document.querySelector('.clear-all');

// নতুন টাস্ক যোগ করার কমন ফাংশন (কোড ডুপ্লিকেশন কমানোর জন্য)
function createTodo() {
    let taskText = todoInput.value.trim(); 

    if (taskText === "") {
        alert("দয়া করে আগে কিছু লিখুন!");
        return; 
    }

    let li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">বাদ দিন</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    // আইটেমটি নিচে যোগ করা হলো
    todoList.appendChild(li);

    // ইনপুট ফিল্ড খালি করা হলো
    todoInput.value = "";

    // 💡 স্মুথ স্ক্রলিং ইফেক্ট: আইটেম যোগ হওয়া মাত্রই স্ক্রল করে নিচে নিয়ে যাবে
    todoList.scrollTo({
        top: todoList.scrollHeight,
        behavior: 'smooth' // এটি অ্যানিমেশনটিকে আরও সুন্দর ও স্মুথ করবে
    });
}

// মাউস দিয়ে Add বাটনে ক্লিক করলে
addBtn.addEventListener('click', () => {
    createTodo();
});

// কীবোর্ডের Enter চাপলে
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        createTodo(); 
    }
});

// Clear All বাটনের কাজ
clearBtn.addEventListener('click', () => {
    todoList.innerHTML = "";
});

// --- অটো ফোকাস মেকানিজম (আপনার আগের কোড) ---
let isInputActive = false; 
const todoContainer = document.querySelector('.todo-container');

todoInput.addEventListener('click', () => {
    isInputActive = true;
});

document.addEventListener('click', (event) => {
    if (!todoContainer.contains(event.target)) {
        isInputActive = false;
    }
});

window.addEventListener('keydown', (event) => {
    if (isInputActive && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        if (document.activeElement !== todoInput) {
            todoInput.focus();
        }
    }
});
