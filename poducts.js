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

let products = [];
 products =
  JSON.parse(localStorage.getItem("productsList")).length > 0
    ? JSON.parse(localStorage.getItem("productsList"))
    : products = [
        {
          title: "Мясо",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },

        {
          title: "Рыба",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Сыр",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Яйца",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Перекус",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Мясной рулет",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Фрукты",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Йогурты",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "Творог",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
      ];

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

const saveToLocalStorage = (key = "productsList") => {
  localStorage.setItem(key, JSON.stringify(products));
};
saveToLocalStorage();

function render(arr) {
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML =
      '<p>Пора вам добавить пару заметок ;)</p><img src="/up.webp"></img>';
  }

  for (let i = 0; i < arr.length; i++) {
    list.insertAdjacentHTML("afterbegin", getItemTask(arr[i], i));
  }
}
render(products);

function sortNotesToCompleted() {
  products.sort(
    (a, b) =>
      (b.completed < a.completed) - (a.completed < b.completed) ||
      (b.title < a.title) - (a.title < b.title)
  );
}
sortNotesToCompleted();

function allCountTask() {
  allTask.textContent = `Всего задач: ${products.length}`;
}
allCountTask();

function countCompletedTask() {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].completed === true) {
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

    products.push(newNote);

    allCountTask();
    countCompletedTask();
    sortNotesToCompleted();
    saveToLocalStorage();
    render(products);

    valueElement.value = "";
  }
};

let newNotes = [];

searchInput.addEventListener("input", () => {
  list.innerHTML = "";
  newNotes = products.filter((e) =>
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
  products.length = 0;
  allCountTask();
  countCompletedTask();
  saveToLocalStorage();
  render(products);
  console.log(1);
};

deleteCompletedAll.onclick = function () {
  products = products.filter((item) => item.completed === !true);

  allCountTask();
  countCompletedTask();
  sortNotesToCompleted();
  saveToLocalStorage();
  render(products);
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
      products[index].completed = !products[index].completed;
    } else if (type === "remove") {
      products.splice(index, 1);
    } else if (type === "edit") {
      let note = prompt("Изменение задачи", "");
      if (note) {
        products[index].title = note;
      }
    } else if (type === "value") {
      if (boldStyle.classList.contains("active")) {
        products[index].bold = !products[index].bold;
      }
      if (italicStyle.classList.contains("active")) {
        products[index].italic = !products[index].italic;
      }
      if (underlineStyle.classList.contains("active")) {
        products[index].underline = !products[index].underline;
      }
    }
    allCountTask();
    countCompletedTask();
    sortNotesToCompleted();
    saveToLocalStorage();
    render(products);
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
