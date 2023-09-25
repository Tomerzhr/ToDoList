window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const userName = localStorage.getItem("username") || "";
  nameInput.value = userName;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();

    displayTodoList();
  });
  displayTodoList();
});

function displayTodoList() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((task) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = task.done;
    const span = document.createElement("span");
    span.classList.add("bubble");
    const content = document.createElement("div");
    content.classList.add("todo-content");
    const action = document.createElement("div");
    action.classList.add("action");
    const edit = document.createElement("button");
    edit.classList.add("edit");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");

    if (task.category == "personal") {
      span.classList.add("personal");
      todoItem.style.borderLeft = "8px solid #12ba7f";
    } else if (task.category == "work") {
      span.classList.add("work");
      todoItem.style.borderLeft = "8px solid #e25205";
    } else {
      span.classList.add("general");
      todoItem.style.borderLeft = "8px solid #2a3bba";
    }

    content.innerHTML = `<input type="text" value="${task.content}" readonly/>`;

    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    action.appendChild(edit);
    action.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(action);

    todoList.appendChild(todoItem);

    if (task.done) {
      todoItem.classList.add("done");
    } else {
      todoItem.classList.remove("done");
    }

    input.addEventListener("click", (e) => {
      task.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      displayTodoList();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        task.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodoList();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != task);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodoList();
    });
  });
}
