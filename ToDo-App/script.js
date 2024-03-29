const form = document.getElementById("form");
const input = document.getElementById ("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => {
        addToDo(todo);

    });
    
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    addToDo(); 

});

function addToDo(todo){
    let todoText = input.value;

    if (todo){
        todoText = todo.text;
    }

    if(todoText){
        const todoEl= document.createElement("li");

        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML= todoText;

        todoEl.addEventListener("click",()=>{
            todoEl.classList.toggle("completed");
        });

        todoEl.addEventListener('contextmenu',(e) => { //delete with right click
            e.preventDefault();
            
            todoEl.remove();

            updateLS();
        })

        todosUl.appendChild(todoEl);

        input.value = "";

        updateLS();
    }

}

function updateLS(){
    const todosEl = document.querySelectorAll('li');

    const todo= [];

    todosEl.forEach(todoEl =>{
            todo.push({
                text: todoEl.innerText,
                completed: todoEl.classList.contains("completed"),
            });
    });

    localStorage.setItem("todos", JSON.stringify(todo));

}