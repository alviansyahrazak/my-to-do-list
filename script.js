const addButton = document.getElementById("add_button");
const userInput = document.getElementById("todo_entry_box");
const myList = document.getElementById("todo_list");

const addList = () => {
  if (userInput.value !== "") {
    const li = document.createElement("li");
    li.textContent = userInput.value.trim();
    myList.appendChild(li);
    userInput.value = "";
    li.addEventListener("dblclick", markList);
  }
};

const markList = (event) => {
  const li = event.target;
  if (li.classList.contains("list_completed")) {
    li.classList.remove("list_completed");
  } else {
    li.classList.add("list_completed");
  }
};

const clearComplete = () => {
  let list = document.getElementsByClassName("list_completed");
  while (list.length > 0) {
    list.item(0).remove();
  }
};

const emptyList = () => {
  myList.innerHTML = "";
  localStorage.removeItem("saveData");
};

const saveList = () => {
  let saveData = [];
  for (let i = 0; i < myList.children.length; i++) {
    let li = myList.children[i];
    let liInfo = {
      task: li.textContent,
      completed: li.classList.contains("list_completed"),
    };
    saveData.push(liInfo);
  }

  localStorage.setItem("saveData", JSON.stringify(saveData));
  alert("Saved data");
};

const loadList = () => {
  if (localStorage.getItem("saveData") !== null) {
    let loadData = JSON.parse(localStorage.getItem("saveData"));
    for (let i = 0; i < loadData.length; i++) {
      let li = document.createElement("li");
      li.textContent = loadData[i].task;
      if (loadData[i].completed) {
        li.classList.add("list_completed");
      }
      li.addEventListener("dblclick", markList);
      myList.appendChild(li);
    }
  }
};

addButton.addEventListener("click", addList);
// userInput.addEventListener("keydown", addList);
document.addEventListener("DOMContentLoaded", loadList);
