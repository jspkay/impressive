import * as logging from "./logging.js"
import {Mouse} from "./tools.js"

// The class element fives an api to put elements on the canvas.
// It takes care of constructing elements and adding them to the DOM.
// On top of that, it gives access to the basic properties of every element
// of which we compose our presentation
class Element{
  constructor(element){
    if(this.constructor == Element){
      throw new Error("Abstract class cannot be instantiated!");
    }
    this.element = element;
    this.x = Number(element.dataset.x);
    this.y = Number(element.dataset.y);
    this.tooSmall = false; // Does this stay ?
  }
  setPosition(x, y, sticky = false){
    if(sticky) {
      x = round(x, M); // Compute position 
      y = round(y, M);
    }
    this._setPosition(x, y);
  }
  getProperties(){
    return {
      x: this.x, y: this.y,
    }
  }
  getPosition(){
    return [this.x, this.y]
  }
  destroy(){
    this.element.remove();
    delete this.element;
  }
  _setPosition(x, y){
    this.element.style.transform = `translate(${x}px, ${y}px)`;
    this.element.dataset.x = x;
    this.element.dataset.y = y;
    this.x = x;
    this.y = y;
  }
}

// The class container is similar to inkscape Rectangles. 
// In short, it makes an element which works as a container, 
// providing an api to modify its appearance
export class Container extends Element{
  constructor(element){
    super(element);
  }
  static tranfromWrtRoot(x, y){
    logging.debug("element.js:tranfromWrtRoot:" + this.rootId)
    let dataset = document.querySelector(`#${this.rootId}`).dataset;
    x = x - Number( dataset.x );
    y = y - Number( dataset.y );
    return [x, y];
  }
  static create(x, y, rootId){
    this.rootId = rootId;
    let element = document.createElement("div"); // creating container
    element.classList.add("container"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    [x, y] = Container.tranfromWrtRoot(x, y);
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    document.querySelector(`#${rootId}`).appendChild(element); // put it on the display
    return new Container(element);
  }
  static fromElement(element){
    let x = Number(element.dataset.x);
    let y = Number(element.dataset.y);
    return new Container(x, y, element);
  }
  setSize(w, h){
    this.element.style.height = `${h}px`;
    this.element.style.width = `${w}px`;
  }
  setSizeFromPos(px, py){
    [px, py] = Container.tranfromWrtRoot(px, py);
    let w = px - this.x;
    let h = py - this.y;
    this.tooSmall = h < 0 || w < 0;
    this.setSize(w,h);
  }
  setFillColor(color){
    this.element.style.backgroundColor = color;
  }
  setBorderColor(color){
    this.element.style.borderColor = color;
  }
  setBorderThickness(t){
    let old = Number( this.element.style.borderWidth.replace("px", "") )
    let displacement = t - old;
    console.log(displacement);
    this._setPosition( this.x - displacement, this.y - displacement);
    this.element.style.borderWidth = `${t}px`;
    this.element.style.borderStyle = "solid";
  }
  setBorderRadius(r){
    this.element.style.borderRadius = `${r}px`;
  }
  getProperties(){
    let element = this.element;
    return Object.assign(
      {},
      super.getProperties(), 
      {
        height: Number( element.style.height.replace("px", "") ),
        width: Number( element.style.width.replace("px", "") ),
        fillColor: element.style.backgroundColor,
        borderColor: element.style.borderColor,
        borderThickness: element.style.borderThickness,
        borderRadius: Number( element.style.borderRadius.replace("px", "") ),
      }
    )
  }
  getHeight(){
    return Number( this.element.style.height.replace("px", "") );
  }
  getWidth(){
    return Number( this.element.style.width.replace("px", "") );
  }
  finish(){
    if( this.tooSmall )
      this.destroy()
  }
}


// The class Window is special, in that is really used for the UI, as 
// it's not intended to be used as an element of the presentation. 
// TODO: Evaluate whether this should be moved to a different module
export class Window extends Container{
  static create(x, y){

    // Create the window itself 
    let element = document.createElement("div"); // creating container
    element.classList.add("window"); // appropriate style
    element.style.position = "fixed"; // prevents overlapping
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    document.querySelector(`#overlay`).appendChild(element); // put it on the display

    // Create the draggable element 
    let de = document.createElement("div");
    de.classList.add("draggable");
    element.append(de);
    this.setDraggable(element, de);

    return new Window(element);
  }
  setPosition(x, y){
    if(x<0) x = 0; 
    if(x+this.width > window.innerWidth) x = window.innerWidth-this.width;
    if(y<0) y = 0;
    if(x+this.height > window.innerHeight) y = window.innerHeight-this.height;
    super.setPosition(x, y);
  }
  static setDraggable(draggable, trigger){
    let active = null;
    let mouse = new Mouse();
    let initialPos = [];

    trigger.addEventListener(
      "mousedown",
      (e) => {
        mouse.mouseDown(e);
        active = new Window(draggable);
        initialPos  = active.getPosition();
      }
    );
    document.addEventListener(
      "mousemove",
      (e) => {
        mouse.mouseMove(e);
        if(mouse.clicking){
          let dx = mouse.currentCoord[0] - mouse.clickStarted[0]; 
          let dy = mouse.currentCoord[1] - mouse.clickStarted[1];
          active.setPosition( initialPos[0] + dx , initialPos[1] + dy )
        }
      }
    );
    document.addEventListener(
      "mouseup", 
      (e) => {
        mouse.mouseUp(e);
        active = null;
      }
    );
  }
}

// Similarly to Window, PropertyWindow is intended for the user to interact 
// with the elements, but not as a presentation element. 
// TODO: Consider to move this in a different module
export class PropertyWindow extends Container{
  constructor(element){
    super(element)
    this.activeElement = null; // TODO: correctly set this activeElement
  }
  static create(x, y){
    let element = document.createElement("div"); // creating container
    element.classList.add("property-window"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    document.querySelector(`body`).appendChild(element); // put it on the display
    return new PropertyWindow(element);
  }
  displayProperties(properties){
    for(let key in properties){
      let prop = document.createElement("div");
      let label = document.createElement("label");
      let value = document.createElement("input")
      value.type = "text";

      prop.appendChild(label);
      prop.appendChild(value);

      label.innerText = key;
      value.value = properties[key];
      this.element.appendChild(prop);
    }
  }
  // TODO: make an eventListener for the change on each prop, so that we apply
  // the change to this.activeElement
}
