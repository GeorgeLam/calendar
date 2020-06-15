let btn = document.querySelector("#smash");
let text = document.querySelector("#txt");
let input = document.querySelector("#smash");
let com = document.querySelector("#com");
let delBtn = document.getElementsByClassName("delBtn");
let editBtn = document.getElementsByClassName("editBtn");
let newTexts = document.getElementsByClassName("newText");
let saveEdit = document.getElementsByClassName("saveEdit");
let newAdded = 2;

let inputs = ["A", "B"];

btn.addEventListener("click", () => {
  //text.innerHTML = ""
  inputs.push(com.value);

  //for (let i = 0; i < inputs.length; i++) {
  //console.log(inputs[newAdded])
  text.innerHTML += `<li>
                <div id="list-text${newAdded}">${inputs[newAdded]}</div>
                <div class="list"><a class="delBtn">
                    <i class="gg-close-o"></i></a>
                <a class="editBtn">Edit</a>
                </div>
            </li>`;
  newAdded++;
  console.log(text.innerHTML);

  // }
  delBtnEnable();
  saveEditCheck();
});
//Cleaned

delBtnEnable = function () {
  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", () => {
      console.log(i + " " + delBtn.length);
      if (i >= delBtn.length) {
        i = delBtn.length - 1;
        console.log("Correcting");
      } ////Corrected the penultimate error since the loop was prematurely ending otherwise. However, setting i to -1 or using <= delBtn.length initially would have caused errors, since would mean applying aEL to non-existent items -> causes the same error.
      //inputs.pop();
      delBtn[i].parentElement.parentElement.remove();
      //if (i !== delBtn.length && i < 10){i++;};
    });
  } //end of for loop on delBtn

  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", () => {
      console.log(editBtn[i].parentElement.previousElementSibling.innerText);
      editBtn[
        i
      ].parentElement.previousElementSibling.innerHTML = `<input type="text" class="newText" value="${editBtn[i].parentElement.previousElementSibling.innerText}"><button class="saveEdit">Save Edit</button>`;
      //editBtn[i].parentElement.previousElementSibling.innerText = "";
      saveEditCheck();
    });
  }
};

let saveEditCheck = function () {
  for (let i = 0; i < saveEdit.length; i++) {
    saveEdit[i].addEventListener("click", () => {
      if (i >= saveEdit.length) {
        i = saveEdit.length - 1;
        console.log("Correcting");
      }
      console.log("You just clicked save on button " + i);
      console.log(document.querySelectorAll("li").length);

      let savedNum = i;
      let numb =
        saveEdit[i].parentElement.parentElement.firstElementChild.id[
          saveEdit[i].parentElement.parentElement.firstElementChild.id.length -
            1
        ];

      //editBtn[savedNum].parentElement.previousElementSibling.innerHTML = newTexts[savedNum].value;
      document.querySelector(`#list-text${numb}`).innerHTML =
        newTexts[savedNum].value;
    });
  }
};

delBtnEnable();

//text.innerHTML += `<li>${com.value}</li>`
//adding to a list
//inputs.push(com.value); text.appendChild(inputs) THIS just adds to single line, if txt is a p element.

//if (com.value === "delete"){
//text.innerHTML = text.innerHTML.slice(0, text.lastIndexOf("<li>"));
//inputs.pop(); text.innerHTML = inputs}
