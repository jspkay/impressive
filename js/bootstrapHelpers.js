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
export function makeFieldNumber(prop, value, alwaysPositive=false, delta=null){
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

  let addDeltaAlwaysPositive = function(e){
      e.preventDefault();
      input.value = Number(input.value) + (delta==null ? e.deltaY : Math.sign(e.deltaY) * delta);
      if(input.value < 1){ input.value = 1; }
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  }
  let removeOneAlwaysPositive = function(e){
      input.value = Number(input.value) - 1;
      if(input.value < 1){ input.value = 1; }
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  };
  let addDelta = function(e){
      e.preventDefault();
      input.value = Number(input.value) + (delta==null ? e.deltaY : Math.sign(e.deltaY) * delta);
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  }
  let removeOne = function(e){
      input.value = Number(input.value) - 1;
      window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  };
  let addOne = function(e){
    input.value = Number(input.value) + 1;
    window.layout.eventHub.emit("propertyChanged", {[prop]: input.value});
  };

  // create the event listenere for the plus button 
  let btn = root.querySelector(".btn-value-plus");

  btn.addEventListener("click", addOne);
  // when scrolling, also the plus button can go to <0
  if(alwaysPositive) btn.addEventListener("wheel", addDeltaAlwaysPositive);
  else btn.addEventListener("wheel", addDelta);

  // create the event listener for the minus button
  btn = root.querySelector(".btn-value-minus");
  if(alwaysPositive){
    btn.addEventListener("click", removeOneAlwaysPositive);
    btn.addEventListener("wheel", addDeltaAlwaysPositive);
  }else{
    btn.addEventListener("click", removeOne);
    btn.addEventListener("wheel", addDelta);
  }

  return root;
}

export function makeContextMenu(elements){
  let menu = document.createElement("div");
  let list = document.createElement("div");
  list.classList.add("list-group");
  menu.appendChild(list);
  for(const [label, listener] of Object.entries(elements) ){
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.classList.add("list-group-item", "list-group-item-action");
    a.innerHTML = label;
    a.addEventListener(
    "click", (e)=>{ listener(e); menu.remove(); },
    );
    list.appendChild(a);
  }
  menu.addEventListener("mouseleave", (e) => {
    menu.remove();
    menu = undefined;
  });
  return menu;
}
