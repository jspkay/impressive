"use strict";

import * as logging from "./logging.js"
console.log(logging)
logging.setLevel( logging.levels.DEBUG )

logging.debug("Starting stuff...")

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

// The first thing we need is robust apis that work without user interactions 
// so that we can build on them.
// Specifically we need:
// - two modes: presentation and edit
// - a way to move the slides around (really the avilable space)
// - a way to insert new elements 
// - a way to save a presentation to a file 
// - a way to load a presentation from a file
//
// the two modes should be able to be switched from point to point so that 
// the user will be able to either edit or present. 
//
// On top of that, it will be necessary to introduce ui/ux elements, which 
// will presumably come with new compontents.

// The class Canvas is responsible to move the slides around
// It has to be constructed and then the method move(x, y, scale)
// is available. 
// Also, it is possible to make set a smooth transition via the method transition

// main components 
import {PropertyWindow, Container} from "./elements.js"
import {StepManager} from "./step_manager.js"
import {TransitionManager} from "./transition_manager.js"

// tools 
import {RectangleTool} from "./tools.js"

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
  transition(smooth){
    if(smooth){
      this.element.style.transition = "all 0.3s linear";
    }else{
      this.element.style.transition = "";
    }
  }
}

function switchMode(mode){
  if(mode == Modes.PRESENTATION){
    modeObject = new PresentationMode();
  }
  if(mode == Modes.EDITOR){

  }
}

// Main setup
logging.debug("Setting up impressive...");


export var impressive = function(rootId){

  var tools;
  var activeMode = Modes.EDITOR;
  var modeObject = null;
  var root = rootId;

  var sm = new StepManager();

  var init = function(){

    tools = initTools(rootId);

    logging.debug(tools);

    var activeTool = tools.ContainerTool;
    // activeTool.init();

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

class EditorMode{
  constructor(){}
}

class PresentationMode{
  constructor(){
    document.querySelector("#overlay").classList.add("hidden");
    document.addEventListener("keydown", this.handleKeys);
  }

  handleKeys(e){
    console.log(e);

  }

}

// we export the user API here
window.impressive = {
  tools: {
    RectangleTool: RectangleTool,
  },
};

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


function round(x, m){
  let r = x / m;
  return Math.round(r) * m;
}
var M = 32;
var rootId = "scene";



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
        active = Container.create(mouse.clickStarted[0], mouse.clickStarted[1], root);
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

