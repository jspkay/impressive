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
export function makeFieldBool(prop, value, triggerEvent){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  root.innerHTML = `
<div class="form-check">
<span class="input-form-check-label" for=${prop} >${prop}</span>
<input type="checkbox" class="form-check-input" id=${prop} >
</div>
`

  if(triggerEvent == undefined)
    triggerEvent = "propertyChanged";

  let input = root.querySelector("input");
  input.value = value;
  input.addEventListener("change", (e)=>{
    window.layout.eventHub.emit(triggerEvent, {[prop]: e.target.checked});
  });

  return root;
}
export function makeFieldNumber(prop, value, triggerEvent, alwaysPositive=false, delta=null){
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

  if(triggerEvent == undefined){
      triggerEvent = "propertyChanged";
  }

  let input = root.querySelector("input");
  input.value = value;
  input.addEventListener("change", (e)=>{
    window.layout.eventHub.emit(triggerEvent, {[prop]: e.target.value});
  });

  let addDeltaAlwaysPositive = function(e){
      e.preventDefault();
      input.value = Number(input.value) + (delta==null ? e.deltaY : Math.sign(e.deltaY) * delta);
      if(input.value < 1){ input.value = 1; }
      window.layout.eventHub.emit(triggerEvent, {[prop]: input.value});
  }
  let removeOneAlwaysPositive = function(e){
    input.value = Number(input.value) - 1;
    if(input.value < 1){ input.value = 1; }
    window.layout.eventHub.emit(triggerEvent, {[prop]: input.value});
  };
  let addDelta = function(e){
      e.preventDefault();
      input.value = Number(input.value) + (delta==null ? e.deltaY : Math.sign(e.deltaY) * delta);
      window.layout.eventHub.emit(triggerEvent, {[prop]: input.value});
  }
  let removeOne = function(e){
    input.value = Number(input.value) - 1;
    window.layout.eventHub.emit(triggerEvent, {[prop]: input.value});
  };
  let addOne = function(e){
    input.value = Number(input.value) + 1;
    window.layout.eventHub.emit(triggerEvent, {[prop]: input.value});
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
export function makeFieldTextArea(prop, value){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  root.innerHTML = `
<span class="input-group-text" >${prop}</span>
<textarea placeholder="${prop}" class="form-control" ></textarea>
`

  let input = root.querySelector("textarea");
  input.value = value;
  input.addEventListener("change", (e)=>{
    window.layout.eventHub.emit("propertyChanged", {[prop]: e.target.value});
  });

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
  // TODO: make another listener to mousemove, so that 
  // when the mouse is inside the box `list-group`, the 
  // mouseleave doesn't destroy the element.
  // Or actually, we can just fuck about mouseleave 
  // and be sure the element exists in the ...
  menu.addEventListener("mouseleave", (e) => {
    menu.remove();
    menu = undefined;
  });
  return menu;
}

export function makeForm(fields){
  let form = document.createElement("form");

  for( const [label, opts] of Object.entries(fields) ){
    let div = document.createElement("div");
    div.innerHTML = `
      <label>${label}</label>
      <input type=${opts.type} class="form-control" id=${opts.id}> `;
    form.appendChild(div);
  }

  return form;
}

export class Modal{

  constructor(title, content, primaryButtonText, opts){
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.setAttribute("tabindex","-1");
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary">${primaryButtonText}</button>
          </div>
        </div>
      </div> `;
    if(content instanceof HTMLElement)
      modal.querySelector(".modal-body").appendChild(content);
    else
      modal.querySelector(".modal-body").innerHTML = content;

    this.modalElement = modal;
    if(opts == undefined){
      opts = {
        backdrop: true,
        focus: true,
        keyboard: true,
      }
    }
    this.modal = new bootstrap.Modal(
      modal,
      opts
    );
  }
  async takeResult(fn){
    return new Promise( (resolve, reject) => {
      this.modalElement.querySelector(".btn-primary").addEventListener(
        "click", (e) => {
            let value = fn(e);
            resolve({cancelled: false, value: value });
            this.modal.hide();
          }
      );
      this.modalElement.querySelector(".btn-secondary").addEventListener(
        "click", (e) => {
          resolve({cancelled: true, });
        }
      );
    });
  }
  show(){
    this.modal.show();
  }
  dispose(){
    this.modal.dispose();
    this.modalElement.remove();
  }
}
