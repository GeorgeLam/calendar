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
thisMonthDays = new Date();

for (let i = 1; i <= 30; i++) {
    let dates = document.createElement("DIV");
    dates.textContent = i;
    dates.className = "dayNum"
    calendar.appendChild(dates)
}

const dayNum = document.querySelectorAll(".dayNum");

dayNum.forEach(item => {
    item.addEventListener("click", () => { console.log(item.innerText)
    rHS.style.display = "flex";

    let eventAdder = document.querySelector("#addEventTitle")
        eventAdder.textContent = `Add an event to June ${item.innerText}`

    })});

///////////////

//let currentItems = 0;
let items = [];

class ListItem {
  constructor(name) {
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
  updateList();
};

function buttonActivate () {
  console.log("Activating buttons!")
  for (let i = 0; i < items.length; i++){
    console.log(i)
    document.querySelectorAll(".editBtn")[i].addEventListener("click", editItem)
  }
  for (let i = 0; i < items.length; i++) {
    document.querySelectorAll(".delBtn")[i].addEventListener("click", delItem)
  }
}

function editItem(e){
  parentIdName = e.path[2].id
  let parentIdNum = parentIdName[parentIdName.length-1]
  let editBox = document.createElement('input')
  editBox.id = "itemEditor"
  let parentEl = document.querySelector(`#list-text${parentIdNum}`);
  parentEl.appendChild(editBox)
  let saveEdit = document.createElement('button')
  saveEdit.id = "saveItem"
  saveEdit.innerText = "Save Edit"
  parentEl.appendChild(saveEdit)
  parentEl.children[0].children[1].style.display = "none";
  console.log(e.path[2].children[2])
  e.path[2].children[2].addEventListener("click", () => {
    s = items.map(item => (item.id == parentIdNum))

    console.log("Id should be..." + s.indexOf(true))

    items[s.indexOf(true)].name = editBox.value;
    console.log(items);
    updateList();
    //YOU NEED TO FIND THE INDEX FOR WHICH ID IS xxx, set the variable to the index and then pass that in
})
  }

function delItem(e) {
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
  text.innerHTML += 
    `<li>
      <div id="list-text${item.id}">${item.name}
      <div class="list"><a class="delBtn">
      <i class="gg-close-o"></i></a>
      <a class="editBtn">Edit</a>
      </div>
      </div>
    </li>`
  }
  )
  buttonActivate();
}







function listChecker () {
  return items.forEach(item => item.name)
}

    /////////////////////////////////

/*
btn.addEventListener("click", () => {
  inputs.push(com.value);

  text.innerHTML += `<li>
                <div id="list-text${newAdded}">${inputs[newAdded]}</div>
                <div class="list"><a class="delBtn">
                    <i class="gg-close-o"></i></a>
                <a class="editBtn">Edit</a>
                </div>
            </li>`;
  newAdded++;
  //console.log(text.innerHTML);
  delBtnEnable();
  saveEditCheck();
});
//Cleaned

delBtnEnable = function () {
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", () => {
      if (i >= delBtn.length) {i = delBtn.length - 1;} 
      delBtn[i].parentElement.parentElement.remove();
    });
  } //end of for loop on delBtn

  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", () => {
        listElement = i;
       //let numb = editBtn${newAdded}.parentElement.parentElement.firstElementChild.id[saveEdit[i].parentElement.parentElement.firstElementChild.id.length - 1];
            //console.log("Woah" + numb);
        console.log("Hello" +  [i] +" " + editBtn.length); //if add two items, delete first, then can't edit 2nd
      //console.log(editBtn[i].parentElement.previousElementSibling.innerText);

      //if (editBtn.length == 1){listElement = 0};

      console.log(editBtn[0] + "h" + editBtn[1])
        editBtn[listElement].parentElement.previousElementSibling.innerHTML = `<input type="text" class="newText" value="${editBtn[listElement].parentElement.previousElementSibling.innerText}"><button class="saveEdit">Save Edit</button>`;
      saveEditCheck();
    });
  }
};

let saveEditCheck = function () {
  for (let i = 0; i < saveEdit.length; i++) {
    saveEdit[i].addEventListener("click", () => {
      if (i >= saveEdit.length) {i = saveEdit.length - 1};

      let savedNum = i;
      let numb =
        saveEdit[i].parentElement.parentElement.firstElementChild.id[saveEdit[i].parentElement.parentElement.firstElementChild.id.length -1];

      document.querySelector(`#list-text${numb}`).innerHTML =
        newTexts[savedNum].value;
    });
  }
};

delBtnEnable();

*/