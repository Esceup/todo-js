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


boldStyle.onclick = function() {
    boldStyle.classList.toggle("active");
}
italicStyle.onclick = function () {
   italicStyle.classList.toggle("active");
};
underlineStyle.onclick = function () {
  underlineStyle.classList.toggle("active");
};

let notes = [];


notes =
  JSON.parse(localStorage.getItem("mainList")) === null
    ?  (notes = [
        {
          title: "500(тариф)",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },

        {
          title: "1000(тариф + стрижка)",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "5000 на непридвиденные",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "1000 гигиена",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "2000 обс. машины",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "1000 лазер",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "2000 заказать/сходить",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "2600 учёба",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "2500 подарки на нг",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "20000 продукты",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "1000 треня Дани",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "4600 кредит",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "3300 абонемент Дашуля",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "23500 квартира",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "4000 ногти + ресницы",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
        {
          title: "5000 бензин",
          completed: false,
          bold: false,
          italic: false,
          underline: false,
        },
      ])
     : JSON.parse(localStorage.getItem("mainList"))
    
// let notes = JSON.parse(localStorage.getItem("mainList")) || [
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


const saveToLocalStorage = (key = "mainList") => {
  localStorage.setItem(key, JSON.stringify(notes));
};
saveToLocalStorage();

function render(arr){
  list.innerHTML = "";

  if (notes.length === 0) {
    list.innerHTML =
      '<p>Пора вам добавить пару заметок ;)</p><img src="/up.webp"></img>';
  }

  for(let i = 0; i < arr.length; i++){
      list.insertAdjacentHTML("afterbegin", getItemTask(arr[i], i));
  }
}
render(notes);

function sortNotesToCompleted() {
  notes.sort(
    (a, b) =>
      (b.completed < a.completed) - (a.completed < b.completed) ||
      (b.title < a.title) - (a.title < b.title)
  );
}
sortNotesToCompleted();

function allCountTask() {
  allTask.textContent = `Всего задач: ${notes.length}`;
}
allCountTask();


function countCompletedTask() {
  let count = 0;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].completed === true) {
      count += 1;
    }
  }
  completedTask.textContent = `Выполненных задач: ${count}`;
}
countCompletedTask();



btnAddTask.onclick = function() {
    
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

        notes.push(newNote);

        allCountTask();
        countCompletedTask();
        sortNotesToCompleted();
        saveToLocalStorage();
        render(notes);

        valueElement.value = "";
      }
    
    
}


let newNotes = [];

searchInput.addEventListener("input", () => {
    list.innerHTML = "";
    newNotes = notes.filter((e) =>
      e.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    
    if (searchInput.value === '') {
      countMatches.textContent = "";
    } else {
      countMatches.textContent = `Количество совпадений: ${newNotes.length}`;
    }
    render(newNotes);
    
});



deleteAll.onclick = function () {
  notes.length = 0;
  allCountTask();
  countCompletedTask();
  saveToLocalStorage();
  render(notes);
  console.log(1)
};

deleteCompletedAll.onclick = function () {
    notes = notes.filter((item) => item.completed === !true)

    allCountTask();
    countCompletedTask();
    sortNotesToCompleted();
    saveToLocalStorage();
    render(notes);
  
};

list.onclick = function (event) {
   
  // console.log(event.target);
    // if (boldStyle.classList.contains("active")) {
    //   notes[index].bold = true;
    // } else {
    //   notes[index].bold = false;
    // }
    // if (italicStyle.classList.contains("active")) {
    //   notes[index].italic = true;
    // } else {
    //   notes[index].italic = false;
    // }
   
    if(event.target.dataset.index) {
       const index = Number(event.target.dataset.index);
       const type = event.target.dataset.type;

        if (type === "toggle") {
          notes[index].completed = !notes[index].completed;
        } else if (type === "remove") {
          notes.splice(index, 1);
        } else if (type === "edit") {
          let note = prompt("Изменение задачи", "");
          if (note) {
            notes[index].title = note;
          }
        } else if (type === "value") {
          if(boldStyle.classList.contains("active")){
          notes[index].bold = !notes[index].bold
        }
        if (italicStyle.classList.contains("active")) {
          notes[index].italic = !notes[index].italic;
        }
         if (underlineStyle.classList.contains("active")) {
           notes[index].underline = !notes[index].underline;
         }
       
        
        
      }
      allCountTask();
      countCompletedTask();
      sortNotesToCompleted();
      saveToLocalStorage();
      render(notes);
  }
}

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