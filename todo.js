(function () {
  let tasks = [];
  const tasksList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const taskCounter = document.getElementById("tasks-counter");

  console.log("working fine");

  // this function is used to get dummy data from free rest API
  async function fetchToDos() {
    // get request, it return promise
    // fetch("https://jsonplaceholder.typicode.com/todos")
    // .then(function(response){
    //        return response.json();
    //     })
    //   .then(function (data) {
    //     tasks = data.slice(0, 10);
    //     renderList();
    //   })
    //   .catch(function (error) {
    //     console.log("error", error);
    //   });

    // this is a 2nd way to fetch data using "async-await",
    // so you can use above code also to do the same
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      tasks = data.slice(0, 10);
      renderList();
    } catch (error) {
      console.log("error", error);
    }
  }

  // this function is used to add task to dom and show list on the web page
  function addTaskToDOM(task) {
    // createElement is used to create html elements
    // ${} - it is used set javascript variable's value to the html document
    const li = document.createElement("li");
    li.innerHTML = `
            
         
            <input
              type="checkbox"
              id="${task.id}"
              ${task.completed ? "checked" : ""} 
              class="custom-checkbox"/>
            <label for="${task.id}">${task.title}</label>
            <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-delete-icon-image_1129289.jpg" class="delete" data-id="${
              task.id
            }" />
          
           
    `;

    tasksList.append(li);
  }

  function renderList() {
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }

    taskCounter.innerHTML = tasks.length;
  }

  function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });

    if (task.length > 0) {
      const currTask = task[0];
      currTask.completed = !currTask.completed;
      renderList();
      showNotification("Task toggled successfully");
      return;
    }
    showNotification("could not toggled task");
  }

  // this is used to delete the task
  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    });
    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully");
  }

  // this function help us to add task to tasks array.
  function addTask(task) {
    if (task) {
      // fetch("https://jsonplaceholder.typicode.com/todos", {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(task)
      // }).then(function(response){
      //          return response.json();
      //        }).then(function (data) {
      //   console.log(data);
      //   tasks.push(task);
      //   renderList();
      //   showNotification("Task is added successfully");

      // })
      // .catch(function (error) {
      //   console.log("error", error);
      // });

      tasks.push(task);
      renderList();
      showNotification("Task is added successfully");
      return;
    }

    showNotification("Task cannot be added");
  }

  function showNotification(text) {
    alert(text);
  }

  // when user type some text on input box, this function will handle task.
  function handleInputKeyPress(e) {
    // when user press enter, all the wriiten text will store in text variable.
    if (e.key === "Enter") {
      const text = e.target.value;

      // this statement help us to identify that, our input box working properly or not and showing that yes, now if user type something and press enter, it will store in text variable, afteer pressing enter key, inpt box will empty.
      console.log("text", text);

      // if user not type anything, browser will show, pop up message to user.
      if (!text) {
        showNotification("Task text cannot be empty");
        return;
      }

      const task = {
        title: text,
        id: Date.now(),
        completed: false
      };

      e.target.value = "";
      addTask(task);
    }
  }

  function handleClickListener(e) {
    const target = e.target;

    if (target.className === "delete") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      toggleTask(taskId);
      return;
    }
  }

  function initializeApp() {
    fetchToDos();
    addTaskInput.addEventListener("keyup", handleInputKeyPress);
    document.addEventListener("click", handleClickListener);
  }

  initializeApp();
})();
