let btn = document.querySelector("#smash");
let text = document.querySelector("#txt");
let input = document.querySelector("#smash");
let com = document.querySelector("#com");
let inputs = [];
let counter = 0;

btn.addEventListener("click", () => {
    text.innerHTML = ""
    if (com.value !== "delete") { inputs.push(com.value) };
    if (com.value === "delete") { inputs.pop(); console.log("hi") };
    for (let i = 0; i < inputs.length; i++) {
        text.innerHTML += `<li>${inputs[i]}</li>`
    }
}
);


    //text.innerHTML += `<li>${com.value}</li>` 
    //adding to a list
    //inputs.push(com.value); text.appendChild(inputs) THIS just adds to single line, if txt is a p element.

  //if (com.value === "delete"){
    //text.innerHTML = text.innerHTML.slice(0, text.lastIndexOf("<li>"));
    //inputs.pop(); text.innerHTML = inputs}
