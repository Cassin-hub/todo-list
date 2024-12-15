// tableau de tache contiendra des objets taches,
let tasks = [];
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");


// fonction globale avec boucle for Of.

function displayTasks() {
    taskList.innerHTML = "";
    for (const task of tasks) {
        const taskfinish = task.completed ? "text-decoration: line-through; color: grey;" : "";
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
        <span class="task-text" style="${taskfinish}">${task.description}</span>
       <div class="btn-group">
  <button class="btn btn-danger btn-sm" type="button" data-id="${task.id}">Delete</button>
  <button class="btn btn-primary btn-sm" type="button" data-id="${task.id}">Finish</button>
</div>`
        // On selection le bouton delete avec li et on lui met un evenement click.
        taskList.appendChild(li);
        const deleteButton = li.querySelector(".btn-danger");
        deleteButton.addEventListener("click", function () {
            deleteBtn(task.id);
        })

        const finishButton = li.querySelector(".btn-primary");
        finishButton.addEventListener("click", function () {
            finishBtn(task.id);
            // appel de la fonction finish ici
        })
    }
}
// Fonction qui supprime la tache via le filter.
function deleteBtn(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    })
    taskList.innerHTML = "";
    displayTasks();
}
//Function finish pour le bouton finish qui barre une tache.
function finishBtn(id) {
  tasks.forEach(function (task) {
   if (task.id === id) {
    task.completed = !task.completed;
   }
  });
  displayTasks();
}



// Fonction event listener submission Gestionnaire de tâche.
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText.value === "") {
        taskInput.classList.add("is-invalid");
    }
    else {
        taskInput.classList.remove("is-invalid");
    }
    const task = {
        id: Date.now(),
        description: taskText,
        completed: false,
    }
    tasks.push(task);

    displayTasks();
}

// Event listener du form.
taskForm.addEventListener("submit", addTask);
