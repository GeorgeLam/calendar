let btn = document.querySelector("#addBtn");
let listItems = document.querySelector("#listItems");
let eventAdd = document.querySelector("#eventAdd");
let delBtn = document.getElementsByClassName("delBtn");
let editBtn = document.getElementsByClassName("editBtn");
let saveEdit = document.getElementsByClassName("saveEdit");
let inputs = [];
let daysEvents = document.querySelector("#daysEvents")
let listOptions = document.querySelector(".listOptions")
let editMode = 0;

let calendar = document.querySelector("#calendar");
let dateObj = new Date();

document.querySelector(".todayDate").innerText = dateObj.getDate();
dayConvert = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
document.querySelector(".todayDay").innerText = dayConvert[dateObj.getDay()];

let monthHas30Days = [3, 5, 8, 10];
thisMonth = dateObj.getMonth(); //calculating number of days in the month
thisMonth == 1 && (dateObj.getFullYear() % 4 == 0) ? daysInMonth = 29 
: thisMonth == 1 && (dateObj.getFullYear() % 4) ? daysInMonth = 28
: monthHas30Days.includes(thisMonth) ? daysInMonth = 30 
: daysInMonth = 31;

for (let i = 1; i <= daysInMonth; i++) {
    let dates = document.createElement("DIV");
    dates.textContent = i;
    dates.className = "dayNum"
    calendar.appendChild(dates)
    if (i==dateObj.getDate()){
      dates.classList.add("today")
      console.log(dates.classList);
      document.querySelector(".today").style.color = "red"}
}

function showMonthEvents(){
  console.log("Hi months")
  daysEvents.style.visibility = "visible";
  document.querySelector("#daysEventsTop").style.visibility = "hidden";
  document.querySelector("#listContainer").style.visibility = "hidden";
}

//showMonthEvents();

const dayNum = document.querySelectorAll(".dayNum");

dayNum.forEach(item => {
    item.addEventListener("click", () => { 
    document.querySelector("#daysEventsTop").style.visibility = "visible";
      document.querySelector("#listContainer").style.visibility = "visible";  
    console.log(item.innerText)
    daysEvents.style.visibility = "visible";
    eventAdd.focus();

    let eventAdder = document.querySelector("#addEventTitle")
      eventAdder.innerHTML = `<span class="inlineText">Add an event to <span class="inlineText"> June ${item.innerText}`
        clickedDate = item.innerText;
        updateList();
      }
    )
  }
);

document.querySelector(".cancelSelected").addEventListener("click", () =>{
  daysEvents.style.visibility = "hidden"
}
);

//let currentItems = 0;
let items = [];

class ListItem {
  constructor(name) {
    this.date = clickedDate; 
    this.id = items.length;
    this.name = name;
    this.color = "#000000";
    console.log(items)
  }
}

//btn.addEventListener("click", addListItem);
eventAdd.addEventListener("keyup", e => {
  if (e.keyCode === 13 && eventAdd.value != ""){addListItem()}
});

function addListItem () {
  items.push(new ListItem(eventAdd.value))
  console.log("Item Added to List")
  items.forEach(item => console.log("List items are: " + item.name))
  eventAdd.value = "";
  updateList();
  buttonActivate();
};

function buttonActivate () {
  console.log("Activating buttons!")
  itemsOnThisDay = items.filter(item => item.date == clickedDate)
  console.log("Amt of items today: " + itemsOnThisDay.length);

  if (document.querySelectorAll(".itemText").length != 0 && document.querySelectorAll(".listOptions").length != 0){
    for (let i = 0; i < itemsOnThisDay.length; i++){
        
        document.querySelectorAll(".itemText")[i].addEventListener("click", editItem);
      }
      for (let i = 0; i < itemsOnThisDay.length; i++) {
        document.querySelectorAll(".listOptions")[i].addEventListener("click", delItem)
    }
  }
}

function editItem(e){
  for (i = 0; i < e.path.length; i++) {
    if (/list-text/.test(e.path[i].id)) {pathNum = i};
  }

  parentIdName = e.path[pathNum].id
  let parentIdNum = parentIdName[parentIdName.length-1]
  let parentEl = document.querySelector(`#list-text${parentIdNum}`);

  if (editMode == 0 && document.querySelectorAll("#itemEditor").length < 1){
    console.log("New box made")
    var editBox = document.createElement('input')
    editBox.id = "itemEditor"
    editBox.value = document.querySelector(`#list-item${parentIdNum}`).innerText;
    parentEl.appendChild(editBox)
    editBox.focus();
    editMode = 1;
    console.log(document.querySelectorAll("#itemEditor").length)

  let saveEdit = document.createElement('button')
  saveEdit.id = "saveItem"
  saveEdit.innerText = "Save Edit"
  //parentEl.appendChild(saveEdit)

  document.querySelector(`#list-item${parentIdNum}`).style.display = "none";
 
  for (i = 0; i < parentEl.children.length; i++){
    if (/saveItem/.test(parentEl.children[i].id)){saveBtnPath = i};
  }
  for (i = 0; i < parentEl.children.length; i++) {
    if ((parentEl.children[i].classList[0] === "list")) {pathNumList = i};
  }
  for (i = 0; i < parentEl.children[pathNumList].children.length; i++) {
    if ((parentEl.children[pathNumList].children[i].classList[0] === "itemText")) { pathNumEditBtn = i };
  }

  //parentEl.children[pathNumList].children[pathNumEditBtn].style.display = "none";

  function acceptEdit() {
    s = items.map(item => (item.id == parentIdNum))
    items[s.indexOf(true)].name = editBox.value;
    console.log(items);
    updateList(); }

  //e.path[pathNum].children[saveBtnPath].addEventListener("click", acceptEdit)
  
    editBox.addEventListener("keyup", e => { if (e.keyCode === 13 && editBox.value != "") acceptEdit()})

  editMode = 0;

  }
}


function delItem(e) {
  console.log(e.path[2].children[0].id)

  parentIdName = e.path[2].children[0].id 
  console.log("The ID number is: " + parentIdName)
  let parentIdNum = parentIdName[parentIdName.length - 1]
  s = items.map(item => (item.id == parentIdNum))

  items.splice(s.indexOf(true), 1);
  console.log(items)
  updateList();
}

function updateList(){
  console.log("Now updating...")
  listItems.innerHTML = "";
  items.forEach((item, id) => {
    (item.date == clickedDate) ? listItems.innerHTML += 
    `<li class = "singleItem">
      <div class="itemText" id="list-text${item.id}"><span id = "list-item${item.id}">${item.name}</span>
      <div class="list">
      </div>
      </div>

      <div class="itemOptions">
        <p class="listOptions">...</p>
      </div>

    </li>` : ""
  }
  )
  buttonActivate();
}