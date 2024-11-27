const btnAddTask = document.getElementById("create");
const valueElement = document.getElementById("title");
const list = document.getElementById("list");
const deleteCompletedAll = document.getElementById("deleteAllCompleted");
const deleteAll = document.getElementById("deleteAll");
const searchInput = document.getElementById("search");
const completedTask = document.getElementById("completedTask");
const allTask = document.getElementById("allTask");
const countMatches = document.getElementById("countMatches");
const boldStyle = document.getElementById("boldStyle");
const italicStyle = document.getElementById("italicStyle");
const underlineStyle = document.getElementById("underlineStyle");

boldStyle.onclick = function () {
  boldStyle.classList.toggle("active");
};
italicStyle.onclick = function () {
  italicStyle.classList.toggle("active");
};
underlineStyle.onclick = function () {
  underlineStyle.classList.toggle("active");
};

let todays = [];
todays =
  JSON.parse(localStorage.getItem("todaysList")).length > 0
    ? (todays = [
        {
          title: "Осмотр машины",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },

        {
          title: "Сделать футляры",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Сходить на концерт",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Поделать проект",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
      ]) : JSON.parse(localStorage.getItem("todaysList"));
   

// let products = JSON.parse(localStorage.getItem("productsList")) || [
//   {
//     title: "500(тариф)",
//     completed: false,
//     bold: false,
//     italic: false,
//     underline: false,
//   },

//   {
//     title: "1000(тариф + стрижка)",
//     completed: false,
//     bold: false,
//     italic: false,
//     underline: false,
//   },

// ];

const saveToLocalStorage = (key = "todaysList") => {
  localStorage.setItem(key, JSON.stringify(todays));
};
saveToLocalStorage();

function render(arr) {
  list.innerHTML = "";

  if (todays.length === 0) {
    list.innerHTML =
      '<p>Пора вам добавить пару заметок ;)</p><img src="/up.webp"></img>';
  }

  for (let i = 0; i < arr.length; i++) {
    list.insertAdjacentHTML("afterbegin", getItemTask(arr[i], i));
  }
}
render(todays);

function sortNotesToCompleted() {
  todays.sort(
    (a, b) =>
      (b.completed < a.completed) - (a.completed < b.completed) ||
      (b.title < a.title) - (a.title < b.title)
  );
}
sortNotesToCompleted();

function allCountTask() {
  allTask.textContent = `Всего задач: ${todays.length}`;
}
allCountTask();

function countCompletedTask() {
  let count = 0;
  for (let i = 0; i < todays.length; i++) {
    if (todays[i].completed === true) {
      count += 1;
    }
  }
  completedTask.textContent = `Выполненных задач: ${count}`;
}
countCompletedTask();

btnAddTask.onclick = function () {
  if (valueElement.value === "") {
    alert("Введите что-нибудь");
  } else {
    const newNote = {
      title: valueElement.value,
      completed: false,
      bold: false,
      italic: false,
      underline: false,
    };

    todays.push(newNote);

    allCountTask();
    countCompletedTask();
    sortNotesToCompleted();
    saveToLocalStorage();
    render(todays);

    valueElement.value = "";
  }
};

let newNotes = [];

searchInput.addEventListener("input", () => {
  list.innerHTML = "";
  newNotes = todays.filter((e) =>
    e.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  if (searchInput.value === "") {
    countMatches.textContent = "";
  } else {
    countMatches.textContent = `Количество совпадений: ${newNotes.length}`;
  }
  render(newNotes);
});

deleteAll.onclick = function () {
  todays.length = 0;
  allCountTask();
  countCompletedTask();
  saveToLocalStorage();
  render(todays);
  console.log(1);
};

deleteCompletedAll.onclick = function () {
  todays = todays.filter((item) => item.completed === !true);

  allCountTask();
  countCompletedTask();
  sortNotesToCompleted();
  saveToLocalStorage();
  render(todays);
};

list.onclick = function (event) {
  // console.log(event.target);
  // if (boldStyle.classList.contains("active")) {
  //   products[index].bold = true;
  // } else {
  //   products[index].bold = false;
  // }
  // if (italicStyle.classList.contains("active")) {
  //   products[index].italic = true;
  // } else {
  //   products[index].italic = false;
  // }

  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      todays[index].completed = !todays[index].completed;
    } else if (type === "remove") {
      todays.splice(index, 1);
    } else if (type === "edit") {
      let note = prompt("Изменение задачи", "");
      if (note) {
        todays[index].title = note;
      }
    } else if (type === "value") {
      if (boldStyle.classList.contains("active")) {
        todays[index].bold = !todays[index].bold;
      }
      if (italicStyle.classList.contains("active")) {
        todays[index].italic = !todays[index].italic;
      }
      if (underlineStyle.classList.contains("active")) {
        todays[index].underline = !todays[index].underline;
      }
    }
    allCountTask();
    countCompletedTask();
    sortNotesToCompleted();
    saveToLocalStorage();
    render(todays);
  }
};

function getItemTask(note, index) {
  return `
     <li
          class="list-group-item ${
            note.completed ? "taskCompleted" : ""
          } d-flex justify-content-between align-items-center"
        >
          <div class="valueItem
            ${note.completed ? "text-decoration-line-through" : ""} 
            ${note.bold ? "bold" : ""} ${note.italic ? "italic" : ""}
            ${note.underline ? "underline" : ""}
            " data-index="${index}" data-type="value">
            ${note.title}
          </div>
          
          <span>
           <span class="btn btn-edit btn-small" >
           <i class="fa-solid fa-pencil" data-index="${index}" data-type="edit"></i>
          </span>
            <span class="btn-padding btn btn-small btn-${
              note.completed ? "success" : "warning"
            }" data-index="${index}" data-type="toggle">&check;</span>
            <span class="btn-padding btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
          </span>
        </li>
    `;
}
// ${boldStyle.classList.contains("active") ? 'bold' : ''}
