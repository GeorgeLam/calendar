let btn = document.querySelector("#smash");
let text = document.querySelector("#txt");
let input = document.querySelector("#smash");
let com = document.querySelector("#com");
let delBtn = document.getElementsByClassName("delBtn");
let editBtn = document.getElementsByClassName("editBtn");
let newTexts = document.getElementsByClassName("newText");
let saveEdit = document.getElementsByClassName("saveEdit");
let newAdded = 0;
let inputs = [];
let listElement;
let rHS = document.querySelector("#rHS")

let calendar = document.querySelector("#calendar");
let dateObj = new Date();
let monthHas30Days = [3, 5, 8, 10];

let testObj = ["Arra", "Bulbasaur", "Cats"];
test2 = testObj.filter(item => item.match(/sau/))
console.log(test2);

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

const dayNum = document.querySelectorAll(".dayNum");

dayNum.forEach(item => {
    item.addEventListener("click", () => { console.log(item.innerText)
    rHS.style.display = "flex";

    let eventAdder = document.querySelector("#addEventTitle")
        eventAdder.textContent = `Add an event to June ${item.innerText}`
        clickedDate = item.innerText;
        updateList();
      }
    )
  }
);

///////////////

//let currentItems = 0;
let items = [];

class ListItem {
  constructor(name) {
    this.date = clickedDate; 
    this.id = items.length;
    this.name = name;
    this.color = "#000000";
    //items.push(this);
    console.log(items)
  }
}

btn.addEventListener("click", addListItem);

function addListItem () {
  items.push(new ListItem(com.value))
  console.log("Item Added to List")
  items.forEach(item => console.log("List items are: " + item.name))
  com.value = "";
  updateList();
  buttonActivate();
};

function buttonActivate () {
  console.log("Activating buttons!")
  itemsOnThisDay = items.filter(item => item.date == clickedDate)
  console.log("Amt of items today: " + itemsOnThisDay.length);
  if (document.querySelectorAll(".editBtn").length != 0 && document.querySelectorAll(".delBtn").length != 0){
      for (let i = 0; i < itemsOnThisDay.length; i++){
        console.log(document.querySelectorAll(".editBtn"))
        document.querySelectorAll(".editBtn")[i].addEventListener("click", editItem)
      }
    for (let i = 0; i < itemsOnThisDay.length; i++) {
        document.querySelectorAll(".delBtn")[i].addEventListener("click", delItem)
      }
  }
}

//24/06: new error. aEL is undefined on like 74. that's because the for loop is iterating through full length of items array - which includes items that are on a range of dates. this doesn't match with the qty of items found in the DOM, so an error is thrown.
//solution1: create new array objs for each date
//solution2: change the for loop into a foreach
//solution3: keep for, 'items.len' -> sth that accounts for items.len but only on a given day (perhaps need to incorporate new arr variables that are based on a .filter of items)

function editItem(e){
  /*
  let elemArr = [];
  paths = e.path;
  console.log(e.path);
  //searchStr = /list-text/
  for (let i = 0; i < paths.length; i++){
      //26/06 ISSUE! - undefined is returned since for some i values, the element being iterated doesn't have an id, so it throws an error...
    elemArr.push(e.path[i].id);
    //console.log(elemArr);

  }
  //newAra = elemArr.filter(item => item.match(/list-text/))
  //console.log(newAra);

  for (item in elemArr){
    if(item.match(/list-text./)){console.log("hi")};
  }
                                       
    //if (e.path[i].id.match(/list-text/)) { parentIdNuma = 2};
    //if(e.path[i].id.includes(/list-text/)){parentIdNuma = i}
  
  //console.log(parentIdNuma);
  //console.log(paths.find(item => item == /li/));
  //let parentIdName = paths.filter(item => item.find(/list-text/))
  //console.log("You got... " + parentIdName)

  */

  console.log(e.path[2].id)

  for (i = 0; i < e.path.length; i++) {
    if (/list-text/.test(e.path[i].id)) {pathNum = i};
  }

  console.log(pathNum)

  parentIdName = e.path[pathNum].id
  let parentIdNum = parentIdName[parentIdName.length-1]
  let parentEl = document.querySelector(`#list-text${parentIdNum}`);
  let editBox = document.createElement('input')
  editBox.id = "itemEditor"
  editBox.value = document.querySelector(`#list-item${parentIdNum}`).innerText;


  parentEl.appendChild(editBox)
  let saveEdit = document.createElement('button')
  saveEdit.id = "saveItem"
  saveEdit.innerText = "Save Edit"
  parentEl.appendChild(saveEdit)

//TEST STARTS1111-----------

  console.log(e.path[pathNum].children)
  console.log(parentEl.children[0].id.match(/item0/))
  console.log(/item/.test(parentEl.children[0].id))
  console.log(parentEl.children[1].id.includes("item0"))
  console.log(parentEl.children[2].id)
  console.log(parentEl.children[3].id.includes("item0"))
 

  for (i = 0; i < parentEl.children.length; i++){
    if (/saveItem/.test(parentEl.children[i].id)){saveBtnPath = i};
  }

////////end------//////

  for (i = 0; i < parentEl.children.length; i++) {
    if ((parentEl.children[i].classList[0] === "list")) {pathNumList = i};
  }

  for (i = 0; i < parentEl.children[pathNumList].children.length; i++) {
    if ((parentEl.children[pathNumList].children[i].classList[0] === "editBtn")) { pathNumEditBtn = i };
  }

  parentEl.children[pathNumList].children[pathNumEditBtn].style.display = "none";        /////////////////////


  e.path[pathNum].children[saveBtnPath].addEventListener("click", () => {
    s = items.map(item => (item.id == parentIdNum))
    items[s.indexOf(true)].name = editBox.value;
    console.log(items);
    updateList();    
})
  }



function delItem(e) {
  console.log("Del item code workS!")

  parentIdName = e.path[3].id
  console.log("The ID number is: " + parentIdName)
  let parentIdNum = parentIdName[parentIdName.length - 1]
  s = items.map(item => (item.id == parentIdNum))

  console.log("Id should be..." + s.indexOf(true))
  items.splice(s.indexOf(true), 1);
  console.log(items)
  updateList();
//(addressed)issue is the constructor uses an ever increasing id num for every new list item, maybe there's a mismatch with that and the list-text id?
//(addressed)dont splice by pIN(this is interpreted as an INDEX!!! that's WRONG!), splice by the actual value instead
//the .splice is based on pIN. If id num 2 is the only one left, then the array will only have a single item, and obviously splicing position 2 won't do anything - there's nothing there anyway.

//either use some array search method to find item.id = ? , and delete based on that 
//OR alter updateList method to reassign ids based on the item's position in the items array.

}

function updateList(){
  console.log("Now updating...")
  text.innerHTML = "";
  items.forEach((item, id) => {
  (item.date == clickedDate) ? text.innerHTML += 
    `<li>
      <div id="list-text${item.id}"><span id = "list-item${item.id}">${item.name}</span>
      <div class="list"><a class="delBtn">
      <i class="gg-close-o"></i></a>
      <a class="editBtn">Edit</a>
      </div>
      </div>
    </li>` : ""
  }
  )
  buttonActivate();
}



function listChecker () {
  return items.forEach(item => item.name)
}