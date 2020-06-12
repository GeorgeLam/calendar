let btn = document.querySelector("#smash");
let text = document.querySelector("#txt");
let input = document.querySelector("#smash");
let com = document.querySelector("#com");
var delBtn = document.getElementsByClassName("delBtn");
let inputs = [];

btn.addEventListener("click", () => {
    text.innerHTML = ""
    inputs.push(com.value);
     for (let i = 0; i < inputs.length; i++) {
         text.innerHTML += `<li>${inputs[i]}<a class = "delBtn">Delete</a></li>`
    }
    delBtnEnable();
}
);

delBtnEnable = function () {
    for (let i = 0; i < delBtn.length; i++){
        delBtn[i].addEventListener("click", () => {
            console.log(i + " " + delBtn.length)
            if (i == delBtn.length && i < 5){i = delBtn.length -1} ////Corrected the penultimate error since the loop was prematurely ending otherwise. However, setting i to -1 or using <= delBtn.length initially would have caused errors, since would mean applying aEL to non-existent items -> causes the same error.
            inputs.pop();
            delBtn[i].parentElement.remove();
            //if (i !== delBtn.length && i < 10){i++;};
        }
    )
    }
};

delBtnEnable();







    //text.innerHTML += `<li>${com.value}</li>` 
    //adding to a list
    //inputs.push(com.value); text.appendChild(inputs) THIS just adds to single line, if txt is a p element.

  //if (com.value === "delete"){
    //text.innerHTML = text.innerHTML.slice(0, text.lastIndexOf("<li>"));
    //inputs.pop(); text.innerHTML = inputs}
