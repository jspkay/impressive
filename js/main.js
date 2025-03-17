"use strict";

// DOM Management 
(function(document, window){ 
  "use strict";
  console.log("Started");

  var impressive = window.impressive = function(rootId){

    var tools;

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

})(document, window);

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
      }
      getPosition(){
        let style = window.getComputedStyle(this.element);
        let matrix = style.transform || style.webkitTransform || style.mozTransform;
        if(matrix == "none"){
          matrix = "matrix(1, 0, 0, 1, 0, 0)";
        }
        let values = matrix.replace(/\)/g, "").replace(/,/g, "").split(" ");
        console.log(values);
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

      f = (e) => {
        mouse.mouseDown(e);
        active = new MainBody(rootId);
      };
      document.addEventListener("mousedown", f);
      eventListeners["mousedown"] = f;

      f = (e) => {
        mouse.mouseMove(e);
        if(mouse.clicking){
          console.log("moving...");
          let dx = mouse.currentCoord[0] - mouse.clickStarted[0];
          let dy = mouse.currentCoord[1] - mouse.clickStarted[1];
          console.log(dx, dy);
          active.setPositionDelta(dx, dy);
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

(function(document, window){
  "use strict";

  var ContainerTool = function(rootId){

    function round(x, m){
      let r = x / m;
      return Math.round(r) * m;
    }
    var M = 32;

    class Container{
      constructor(x, y){
        x = round(x, M);
        y = round(y, M)
        let container = document.createElement("div");
        container.classList.add("container");
        container.style.position = "absolute"; // prevents overlapping
        console.log(rootId);
        document.querySelector(`#${rootId}`).appendChild(container);
        this.container = container;
        this.x = x;
        this.y = y;
        this.tooSmall = false;
        container.style.transform = `translate(${x}px, ${y}px)`;
        console.log(`creating container at pos ${x} - ${y}`);
      }
      setPosition(x, y){
        this.container.style.transform = `translate(${x}px, ${y}px)`;
        this.x = x;
        this.y = y;
      }
      setSize(w, h){
        this.container.style.height = `${h}px`;
        this.container.style.width = `${w}px`;
      }
      setSizeFromPos(px, py){
        let w = px - this.x;
        let h = py - this.y;
        this.tooSmall = h < 0 || w < 0;
        w = round(w, M);
        h = round(h, M);
        this.setSize(w,h);
      }
      finish(){
        if( this.tooSmall )
          this.destroy()
      }
      destroy(){
        this.container.remove();
        delete this.container;
      }
    }

    var eventListeners = {}
    var active = null;

    function init() {
      document.querySelector("#containerTool").classList.add("active");

      var mouse = new Mouse();
      let f;

      f = (e) => {
        mouse.mouseDown(e);
        active = new Container(mouse.clickStarted[0], mouse.clickStarted[1]);
      };
      document.addEventListener("mousedown", f);
      eventListeners["mousedown"] = f;

      f = (e) => {
        mouse.mouseMove(e);
        if(mouse.clicking) active.setSizeFromPos(mouse.currentCoord[0], mouse.currentCoord[1]);
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

