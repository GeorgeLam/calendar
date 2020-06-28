let btn = document.querySelector("#addBtn");
let listItems = document.querySelector("#listItems");
let eventAdd = document.querySelector("#eventAdd");
let delBtn = document.getElementsByClassName("delBtn");
let editBtn = document.getElementsByClassName("editBtn");
let saveEdit = document.getElementsByClassName("saveEdit");
let inputs = [];
let daysEvents = document.querySelector("#daysEvents")
let listOptions = document.querySelector(".listOptions")
let backMonth = document.querySelector("#backMonth"), forwardMonth = document.querySelector("#forwardMonth")
let editMode = 0;



let calendar = document.querySelector("#calendar");
let dateObj = new Date();
let fsd = 0;
currentMonth = dateObj.getMonth();
currentYear = dateObj.getFullYear();


newerDATE = new Date(2020,05,17)///////////
currentDAY = newerDATE.getUTCDay();
console.log(currentDAY);

document.querySelector(".todayDate").innerText = dateObj.getDate();
dayConvert = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
document.querySelector(".todayDay").innerText = dayConvert[dateObj.getDay()];

let monthHas30Days = [3, 5, 8, 10];

//rewrite this function to spit out amt of days in a given month. then call this function on today's month, in order to return dIM (important var!!!)

function daysInGivenMonth(month){
  //thisMonth = dateObj.getMonth(); //calculating number of days in the month
  month == 1 && (dateObj.getFullYear() % 4 == 0) ? daysInMonth = 29 
    : month == 1 && (dateObj.getFullYear() % 4 !== 0) ? daysInMonth = 28
  : monthHas30Days.includes(month) ? daysInMonth = 30 
  : daysInMonth = 31;
  return daysInMonth;
}

function monthName(month){
  names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return names[month]
}

daysInMonth = daysInGivenMonth(dateObj.getMonth())

class Month {
  constructor(monthNum) {
    this.name = monthName(monthNum);
    this.dayCount = daysInGivenMonth(monthNum);
  }
}

mono = new Month(8);
console.log(`${mono.name} is a month with ${mono.dayCount} days.`);








function createMonth(daysInMonth){
  while (calendar.children.length > 7) {
    calendar.removeChild(calendar.lastChild);
  }

  for (let i = 1; i <= daysInMonth; i++) {
      let dates = document.createElement("DIV");
      dates.textContent = i;
      dates.className = "dayNum"
      calendar.appendChild(dates)
      if (i==dateObj.getDate() && dateObj.getMonth() == currentMonth){
        dates.classList.add("today")
        console.log(dates.classList);
        document.querySelector(".today").style.color = "red"}
  }
}

createMonth(daysInMonth);




////////BACK AND FWD MONTH FUNCTIONALITY/////

backMonth.addEventListener("click", showPrevMonth)
forwardMonth.addEventListener("click", showNextMonth)


function showPrevMonth (){
  if (currentMonth == 0){
    currentMonth = 11;
    currentYear --;
  } else{
    currentMonth--;
  }
  console.log(currentMonth);
  switchedMonth = new Month(currentMonth);
  console.log(switchedMonth);
  createMonth(switchedMonth.dayCount);
  document.querySelector(".monthYear").innerText = `${switchedMonth.name} ${currentYear}`
  
  dateActivate();
}


function showNextMonth() {
  if (currentMonth == 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  console.log(currentMonth);
  switchedMonth = new Month(currentMonth);
  console.log(switchedMonth);
  createMonth(switchedMonth.dayCount);
  document.querySelector(".monthYear").innerText = `${switchedMonth.name} ${currentYear}`

  dateActivate();
}

//////////////////////






function showMonthEvents(){
  console.log("Hi months")
  daysEvents.style.visibility = "visible";
  document.querySelector("#daysEventsTop").style.visibility = "hidden";
  document.querySelector("#listContainer").style.visibility = "hidden";
}

//showMonthEvents();




function dateActivate(){
  let dayNum = document.querySelectorAll(".dayNum");
  console.log("activating days!!")
  console.log(dayNum);
  dayNum.forEach(item => {
      item.addEventListener("click", () => { 
      document.querySelector("#daysEventsTop").style.visibility = "visible";
        document.querySelector("#listContainer").style.visibility = "visible";  
      console.log(item.innerText)
      daysEvents.style.visibility = "visible";
      eventAdd.addEventListener("click", () =>{
        eventAdd.placeholder = "";
      })

      let eventAdder = document.querySelector("#addEventTitle")
        eventAdder.innerHTML = `<span class="inlineText">Add an event to <span class="inlineText"> ${monthName(currentMonth)} ${item.innerText}`
          itemInner = item.innerText
          
          clickedDate = itemInner;
          console.log(clickedDate);
          updateList();
          eventAdd.placeholder = "What's on today?"
        }
      )
    }
  );
}

dateActivate();

document.querySelector(".cancelSelected").addEventListener("click", () =>{
  daysEvents.style.visibility = "hidden"
}
);

//let currentItems = 0;
let items = [];

class ListItem {
  constructor(name) {
    this.date = clickedDate;
    this.month = currentMonth; 
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
  itemsOnThisDay = items.filter(item => item.date == clickedDate && item.month == currentMonth)
  console.log("Amt of items today: " + itemsOnThisDay.length);

  if (document.querySelectorAll(".itemText").length != 0 && document.querySelectorAll(".listOptions").length != 0){
    for (let i = 0; i < itemsOnThisDay.length; i++){
      console.log(document.querySelectorAll(".itemText"))
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
    var editBox = document.createElement('textarea')
    editBox.id = "itemEditor";
    editBox.type = "textarea";
    editBox.wrap = "hard";
    editBox.contentEditable = "true";
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
    (item.date == clickedDate && item.month == currentMonth) ? listItems.innerHTML += 
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