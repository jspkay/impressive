"use strict";

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

// Main setup:
//  - 
//
// Components:
//  - step manager: adds and removes steps 
//  - transition manager: adds, modify and removes transitions 
//  - tool manager: decides how the mouse interacts with the canvas 
//  - presenter: this component moves things around, also during the actual presentation 
//
//  Other than components there are the managers(?)

// Main setup
(function(document, window){ 
  console.log("Started");

  var impressive = window.impressive = function(rootId){

    var tools;
    var activeMode = Modes.EDITOR;

    var sm = new StepManager();

    var init = function(){

      tools = initTools(rootId);

      var activeTool = tools.ContainerTool;
      activeTool.init();

      // all the tools take a function
      document.querySelectorAll(".tool").forEach( (element) =>{ 
        element.addEventListener("click", (e) => {
          // event is triggered
          let s = e.target;
          while( ! s.classList.contains("tool") ){ 
            // we "bubble" up till we find a proper tool
            s = s.parentElement;
          }

          switch(s.id){
            case "moveTool":
              activeTool.destroy();
              activeTool = tools.MoveTool;
            break;
            case "selectTool":
              activeTool.destroy();
              activeTool = new SelectTool();
            break;
            case "containerTool":
              activeTool.destroy();
              activeTool = tools.ContainerTool;
            break;
            case "presentTool":
              activeMode = Modes.PRESENTATION;
              switchMode(activeMode);
          }
          activeTool.init();

        })
      })
    }

    function switchMode(mode){
      if(mode == Modes.PRESENTATION){
        document.querySelector("#overlay").classList.add("hidden");
      }
      if(mode == Modes.EDITOR){

      }
    }

    return ({
      init: init,
    });
  }

// ADD and INIT LIBRARIES
// Library factories are defined in src/lib/*.js, and register themselves by calling
// impress.addLibraryFactory(libraryFactoryObject). They're stored here, and used to augment
// the API with library functions when client calls impress(rootId).
// See src/lib/README.md for clearer example.
// (Advanced usage: For different values of rootId, a different instance of the libaries are
// generated, in case they need to hold different state for different root elements.)
  var toolFactories = {};
  impressive.addToolFactory = function( obj ) {
      for ( var toolname in obj ) {
          if ( obj.hasOwnProperty( toolname ) ) {
              toolFactories[ toolname ] = obj[ toolname ];
          }
      }
  };

  // Call each library factory, and return the lib object that is added to the api.
  var initTools = function( rootId ) { //jshint ignore:line
      var tool = {};
      for ( var toolname in toolFactories ) {
          if ( toolFactories.hasOwnProperty( toolname ) ) {
              if ( tool[ toolname ] !== undefined ) {
                  throw "impressive.js ERROR: Two libraries both tried to use libname: " +  toolname;
              }
              tool[ toolname ] = toolFactories[ toolname ]( rootId );
              console.log(rootId);
          }
      }
      return tool;
  };

})(document, window);

class StepManager {
  // This object manages the steps of our presentation 
  constructor(){
    this.stepCount = 0;
    this.root = document.querySelector("#stepList");
    this.last = document.querySelector("#addStep");
    let addButton = document.querySelector("#addStep");
    addButton.addEventListener(
      "click", (event ) => {
        console.log(this);
        let scene = new Canvas();
        let x = Number(scene.dataset.x);
        let y = Number(scene.dataset.y);
        let scale = 1;
        this.createStep(Array(x,y,scale));
        console.log("New step!");
      }
    )
  }
  createStep(pos){
    let step = document.createElement("div");

    step.innerHTML = String(this.stepCount);
    this.stepCount++;

    step.classList.add("step");
    step.dataset.x = pos[0];
    step.dataset.y = pos[1];
    step.dataset.scale = pos[2];
    step.addEventListener(
      "click", 
      (e) => {
        let el = e.target;
        let scene = new Canvas();

        let x = el.dataset.x;
        let y = el.dataset.y;
        let scale = el.dataset.scale;

        scene.transition(true);
        scene.move(x, y, scale);
        setTimeout(() => {
          let scene = new Canvas();
          scene.transition(false)
        }, 300);
      }
    )
    this.last.insertAdjacentElement("beforebegin", step);
    console.log(pos);
  }
}

// Mouse info
class Mouse{
  constructor(){
    this.clicking = false;
    this.clickStarted = [0, 0];
    this.currentCoord = [0, 0];
    this.clickFinished = [0, 0];
    this.downHandlers = {}
    this.upHandlers = {}
    this.moveHandlers = {}
  }
  addHandler(name, when, f){
    switch(when) {
      case "down":
        this.downHandlers[name] = f;
        break;
      case "up":
        this.upHandlers[name] = f;
        break;
      case "move":
        this.moveHandlers[name] = f;
        break
    }
  }
  mouseDown(e){
    this.clicking = true;
    let x = e.pageX;
    let y = e.pageY;
    this.clickStarted = [x, y];
    console.log(e.target)
    for(idx in this.downHandlers)
      this.downHandlers[idx](e);
  }
  mouseMove(e){
    let x = e.pageX;
    let y = e.pageY;
    this.currentCoord = [x, y];
    for(idx in this.moveHandlers)
      this.moveHandlers[idx](e);
  }
  mouseUp(e){
    let x = e.pageX;
    let y = e.pageY;
    this.clickFinished = [x, y];
    this.clicking = false;
    for(idx in this.upHandlers)
      this.upHandlers[idx](e);
  }
}

// This class takes care of import and export of files 
class FileManager{
  constructor(){}
  static getChildren(element){
    if( element.children.lenght == 0 ){
      return [];
    }

    let res = [];
    for(let child of element.children){
      res.push({
        type: child.tagName, 
        x: child.dataset.x, 
        y: child.dataset.y,
        children: this.getChildren(child),
      })
    }

    return res;
  }
  static exportFile(){
    // This function makes a json of the whole presentation. 
    // It contains a list of steps which relate the space 
    // movement in time. On top of this, the animations are 
    // encoded with each step.
    // Finally, the elements of the canvas are all laid out together
    // to make a canvas which exists outside of the steps.

    let exported = {
      version: "alpha",
      stepList: null,
      elementList: null,
    }

    // gather all the steps 
    let stepList = new Array();
    for(let step of document.querySelectorAll("#step")){
      let x = step.dataset.x;
      let y = step.dataset.y;
      let scale = step.dataset.scale;
      stepList.push({
        x: x, y: y, scale: scale,
      });
    }
    exported.stepList = stepList;

    // gather all the elements on the canvas 
    let elementList = this.getChildren( document.querySelector("#scene") );
    exported.elementList = elementList;
    
    console.log(exported);
    let jsonString = JSON.stringify(exported);
    console.log(jsonString);
    let blob = new Blob(
      [ jsonString ],
      {type: "application/json"}
    );
    let url = URL.createObjectURL(
      blob
    );

    // return;
    let link = document.createElement("a");
    link.href = url;
    link.download = "document.json";
    link.click();

    console.log(blob);
    console.log(url);
  } 
  static importFile(){
    let importElement = document.createElement("input");
  }
}


(function(document, window){
  "use strict";

  var MoveTool = function(rootId){

    class MainBody{
      constructor(element){
        this.element = document.querySelector(`#${element}`);
        this.speed = 0.1;
      }
      setPosition(x, y){
        console.log("setting Position to ", x, y);
        this.element.style.transform = `translate(${x}px, ${y}px)`;
        this.element.dataset.x = x;
        this.element.dataset.y = y;
      }
      getPosition(){
        let style = window.getComputedStyle(this.element);
        let matrix = style.transform || style.webkitTransform || style.mozTransform;
        if(matrix == "none"){
          matrix = "matrix(1, 0, 0, 1, 0, 0)";
        }
        let values = matrix.replace(/\)/g, "").replace(/,/g, "").split(" ");
        // console.log(values);
        let x = Number(values[4]);
        let y = Number(values[5]);
        return [x, y];
      }
      setPositionDelta(dx, dy){
        let [x, y] = this.getPosition();
        this.setPosition(x+dx*this.speed, y+dy*this.speed);
      }
    }

    var eventListeners = {}
    var active = null;

    function init() {
      document.querySelector("#moveTool").classList.add("active");
      var mouse = new Mouse();
      let f;
      let initialPos = Array()

      f = (e) => {
        mouse.mouseDown(e);
        active = new MainBody(rootId);
        initialPos = active.getPosition();
      };
      document.addEventListener("mousedown", f);
      eventListeners["mousedown"] = f;

      f = (e) => {
        mouse.mouseMove(e);
        if(mouse.clicking){
          let dx = mouse.currentCoord[0] - mouse.clickStarted[0];
          let dy = mouse.currentCoord[1] - mouse.clickStarted[1];
          console.log(dx, dy);
          // active.setPositionDelta(dx, dy);
          active.setPosition( initialPos[0] + dx , initialPos[1] + dy )
        }
      };
      document.addEventListener("mousemove", f);
      eventListeners["mouseup"] = f;

      f = (e) => {
        mouse.mouseUp(e);
        active = null;
      };
      document.addEventListener("mouseup", f);
      eventListeners["mouseup"] = f;

    }

    function destroy(){
      for(event in eventListeners)
        document.removeEventListener(event, eventListeners[event] );
      document.querySelector("#moveTool").classList.remove("active");
    }

    return {
      name: "MoveTool",
      init: init,
      destroy: destroy,
    }
  }
  
  impressive.addToolFactory({MoveTool: MoveTool});

})(document, window);

class Canvas{
  constructor(){
   this.element = document.querySelector("#scene");
   this.dataset = this.element.dataset;
  }
  move(x, y, scale){
    let str = `translate(${x}px,${y}px) scale(${scale})`;
    this.element.style.transform = str; 
    console.log(str)
  }
  transition(set){
    if(set){
      self.element.style.transition = "all 0.3s linear";
    }else{
      self.element.style.transition = "";
    }
  }
}

function round(x, m){
  let r = x / m;
  return Math.round(r) * m;
}
var M = 32;
var rootId = "scene";

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

class Container extends Element{
  constructor(element){
    super(element);
  }
  static tranfromWrtRoot(x, y){
    let dataset = document.querySelector(`#${rootId}`).dataset;
    x = x - Number( dataset.x );
    y = y - Number( dataset.y );
    return [x, y];
  }
  static create(x, y){
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

class Window extends Container{
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
    setDraggable(element, de);

    return new Window(element);
  }
  setPosition(x, y){
    if(x<0) x = 0; 
    if(x+this.width > window.innerWidth) x = window.innerWidth-this.width;
    if(y<0) y = 0;
    if(x+this.height > window.innerHeight) y = window.innerHeight-this.height;
    super.setPosition(x, y);
  }
}

function setDraggable(draggable, trigger){
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

class PropertyWindow extends Container{
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

(function(document, window){
  "use strict";

  var ContainerTool = function(rootId){

    var eventListeners = {}
    var active = null;

    function init() {
      document.querySelector("#containerTool").classList.add("active");

      var mouse = new Mouse();
      let f;

      f = (e) => {
        mouse.mouseDown(e);
        active = Container.create(mouse.clickStarted[0], mouse.clickStarted[1]);
        active.tooSmall = true;
        console.log(e)
      };
      document.addEventListener("mousedown", f);
      eventListeners["mousedown"] = f;

      f = (e) => {
        mouse.mouseMove(e);
        if(mouse.clicking) active.setSizeFromPos(mouse.currentCoord[0], mouse.currentCoord[1]);
      //  console.log(e);
      };
      document.addEventListener("mousemove", f);
      eventListeners["mouseup"] = f;

      f = (e) => {
        mouse.mouseUp(e);
        active.finish();
        active = null;
      };
      document.addEventListener("mouseup", f);
      eventListeners["mouseup"] = f;

    }

    function destroy(){
      for(event in eventListeners)
        document.removeEventListener(event, eventListeners[event] );
      document.querySelector("#containerTool").classList.remove("active");
    }
   
    return {
      name: "ContainerTool",
      init: init,
      destroy: destroy,
    }
  }

  impressive.addToolFactory({ContainerTool: ContainerTool})

})(document, window);

