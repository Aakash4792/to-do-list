const addForm = document.querySelector('.add');
const list = document.querySelector('.list-group');
const search = document.querySelector('.search input');
const generateTemplate = todo => {
    const li = `
    <li class="list-group-item">
        <span>${todo}</span>
        <i class="fas fa-trash delete"></i>
    </li>
    `;
    list.innerHTML += li;
}

addForm.addEventListener('submit',e=>{
    e.preventDefault();
    const todo = addForm.addTodo.value.trim();
    
    if(todo.length){
        let todos = [];
	if(localStorage.getItem("todos")){
	  todos = JSON.parse(localStorage.getItem("todos"));
	}
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
        generateTemplate(todo);
        addForm.reset();
    }
});

list.addEventListener('click',e=>{
    if(e.target.classList.contains('delete')){
        let todotext = Array.from(e.target.parentElement.children)[0].textContent;
        e.target.parentElement.remove();
        let todos = localStorage.getItem("todos");
        todoFinal = JSON.parse(todos).filter((todo)=>{
            return todo !== todotext;
        })
        localStorage.setItem('todos',JSON.stringify(todoFinal));
    }
})

const filterTodos = (term) => {
    Array.from(list.children)
         .filter((todo)=>!todo.textContent.toLowerCase().includes(term))
         .forEach((todo)=>{
             todo.classList.add('filtered');
         });
    
    Array.from(list.children)
    .filter((todo)=>todo.textContent.toLowerCase().includes(term))
    .forEach((todo)=>{
        todo.classList.remove('filtered');
    });
    
};

search.addEventListener('keyup',e=>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

if(localStorage.getItem("todos")){
	let def = localStorage.getItem("todos");
	JSON.parse(def).forEach((todo)=>{
    	generateTemplate(todo);
	});
}

