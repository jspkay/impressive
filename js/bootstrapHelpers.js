export function makeField(prop, value){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  root.innerHTML = `
<span class="input-group-text" >${prop}</span>
<input type="text" placeholder="${prop}" class="form-control" >
`

  let input = root.querySelector("input");
  input.value = value;
  input.addEventListener("change", (e)=>{
    window.layout.eventHub.emit("propertyChanged", {[prop]: e.target.value});
  });

  return root;
}
export function makeFieldNumber(prop, value, alwaysPositive=false){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  root.innerHTML = `
<span class="input-group-text" >${prop}</span>
<input type="number" step="0.01" placeholder="${prop}" class="form-control" >

<div class="btn-regulators">
  <button class="btn-value-minus btn btn-outline-secondary" type="button" >-</button>
  <button class="btn-value-plus btn btn-outline-secondary" type="button" >+</button>
</div>
`

  let input = root.querySelector("input");
  input.value = value;
  input.addEventListener("change", (e)=>{
    window.layout.eventHub.emit("propertyChanged", {[prop]: e.target.value});
  });

  // create the event listenere for the plus button 
  let btn = root.querySelector(".btn-value-plus");
  btn.addEventListener("click", (e) => {
    input.value = Number(input.value) + 1;
    window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  });
  // when scrolling, also the plus button can go to <0
  if(alwaysPositive){
    btn.addEventListener("wheel", (e) => {
      e.preventDefault();
      input.value = Number(input.value) + e.deltaY;
      if(input.value < 1){ input.value = 1; }
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });

  }else{
    btn.addEventListener("wheel", (e) => {
      e.preventDefault();
      input.value = Number(input.value) + e.deltaY;
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });
  }

  // create the event listener for the minus button
  btn = root.querySelector(".btn-value-minus");
  if(! alwaysPositive){
    btn.addEventListener("click", (e) => {
      input.value = input.Number(input.value) - 1;
      if(input.value < 1){ input.value = 1; }
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });
    btn.addEventListener("wheel", (e) => {
      e.preventDefault();
      input.value = Number(input.value) + e.deltaY;
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });
  }else{
    btn.addEventListener("click", (e) => {
      input.value = input.Number(input.value) - 1;
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });
    btn.addEventListener("wheel", (e) => {
      e.preventDefault();
      input.value = Number(input.value) + e.deltaY;
      if(Number(input.value) < 1) input.value = 1;
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
    });
  }

  return root;
}


export function makeValueFieldbak(prop, value){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  let name = document.createElement("span");
  name.classList.add("input-group-text");
  name.innerHTML = prop;
  root.appendChild(name);

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", prop);
  input.classList.add("form-control");
  root.appendChild(input);
  input.value = value;

  let div = document.createElement("div");
  div.classList.add("btn-value-holder");
  root.appendChild(input);

  let button = document.createElement("button");
  button.classList.add("btn", "btn-outline-secondary");
  button.setAttribute("type", "button");
  div.appendChild(button);

  button = document.createElement("button");
  button.classList.add("btn", "btn-outline-secondary");
  button.setAttribute("type", "button");
  root.appendChild(button);

  return root;
}
